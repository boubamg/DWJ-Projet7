const models = require('../models');
const jwt = require('jsonwebtoken');
const fs = require('fs')
const { Op } = require("sequelize");

const tokenKey = "key";

// create article
exports.createArticle = (req,res) => {
    // get token and decode it
    let token = req.headers.authorization.split(' ')[1]; 
    let decodedToken = jwt.verify(token, tokenKey);

    // find user where id is decodedToken.userId
    models.User.findOne({ where : { id : decodedToken.userId } })
        .then(user => {
            // user not found
            if(!user){
                return res.status(404).json({ error : "User not found" });
            }
            // get form input
            let content = req.body.content;
            let attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}`: null;

            // create article
            models.Article.create({ 
                content : content,
                attachment : attachment,
                UserId : user.id
            })
            .then(() =>  res.status(201).json({ message: "Article was created" }))
            .catch(error => res.status(400).json({ error : `${error}` }));
        })
        .catch(error => res.status(400).json({ error : `${error}` }))
    
}

// get all article
exports.getAllArticles = (req,res) => {
    // get token and decode it
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, tokenKey);

    // find article where id is decodedToken.userId
    models.User.findOne({ where: {id : decodedToken.userId} })
        .then(user => {
            // if user not found
            if(!user){
                return res.status(404).json({ error : "User not found" })
            }
            // get all article
            models.Article.findAll({

                // include user who created article
                include : [{
                    model: models.User,
                    attributes: ['firstname','lastname','profilePicture'],
                    where: {
                        id: {[Op.col] : 'Article.UserId'}
                    }
                },
                // include article comments
                {
                    model: models.Comment,
                    where: {
                        ArticleId: {[Op.col] : 'Article.id'}
                    },
                    // include user who created comments
                    include : {
                        model: models.User,
                        attributes: ['firstname','profilePicture']
                    },
                    // comments not required
                    required: false
                }
            ],
            order: [
                ['id', 'DESC'],
            ],
            })
            .then(article =>  {
                // if article not found
                if(!article){
                    return res.status(404).json({ error: "Article not found" })
                }
                res.status(200).send(article)
            })
            .catch(error => res.status(400).json({ error: `${error}` }));

        })
        .catch(error => res.status(500).json({ error : `${error}` }));
    
}

// get specific article
exports.getOneArticle = (req,res) => {

    // get one article by his id
    models.Article.findOne({ where : 
        {id : req.params.id },
        // include user who created article
        include : [{
            model: models.User,
            attributes: ['firstname','profilePicture'],
            where: {
                id: {[Op.col] : 'Article.UserId'}
            }
        },
         // include article comments
        {
            model: models.Comment,
            where: {
                ArticleId: {[Op.col] : 'Article.id'}
            },
            // include user who created comments
            include : [{
                model: models.User,
                attributes: ['firstname','profilePicture'],
            }],
            // comments not required
            required: false
        }]
    })
        .then(article =>  {
            // if article not found
            if(!article){
                return res.status(404).json({ error: "Article not found" })
            }
            res.status(200).send(article)})
        .catch(error => res.status(400).json({ error: `${error}` }));
}

// update article 
exports.updateArticle = (req,res) => {
    // get token and decode it
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token, tokenKey);

    // find article where id is decodedToken.userId
    models.User.findOne({ where : { id : decodedToken.userId }})
        .then(user => {
            // if user not found
            if(!user){
                return res.status(404).json({ error: "User not found" })
            }
            // else find article where id is in params
            models.Article.findOne({ where : { id : req.params.id }})
                .then(article => {
                    // if article not found
                    if(!article){
                        return res.status(404).json({ error: "Article not found" })
                    }

                    // get form input
                    let content = req.body.content ? req.body.content : article.content;
                    let attachment = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : article.attachment;

                    // verify if user is article creator
                    if(article.UserId !== user.id) {
                        return res.status(401).json({ error: "You cannot do this" })
                    }
                    
                    // update article with new input
                    article.update({
                        content : content,
                        attachment : attachment
                    })
                    .then(() => res.status(200).json({ message: "Article was updated" }))
                    .catch(error => res.status(500).json({ error: `${error}` }))
                })
                .catch(error => res.status(500).json({ error: `${error}` }));
        })
        .catch(error => res.status(500).json({ error : `${error}` }));
}     

// delete article
exports.deleteArticle = (req,res) => {
    // get token and decode it
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token, tokenKey);

    // find article where id is decodedToken.userId
    models.User.findOne({ where: {id : decodedToken.userId} })
        .then(user => {
            // if user not found
            if(!user){
                return res.status(404).json({ error : "User not found" })
            }
            // else find article where id is decodedToken.userId
            models.Article.findOne({ where : { id : req.params.id } })
                .then(article => {

                    // if article not found
                    if(!article){
                        return res.status(404).json({ error : "Article not found" })
                    }

                     // verify if user is article creator or administrator
                    if(user.id !== article.UserId && !user.isAdmin) {
                        return res.status(401).json({ error : "You cannot do this" })
                    }

                    // delete comments associated with the article
                    models.Comment.destroy({ where : { ArticleId : article.id }})
                        .then(() => res.status(200).json({ message: "All comments was destroyed" }))
                        .catch(error => res.status(500).json({ error: `${error}` }))

                    // delete like associated with the article
                    models.Like.destroy({ where : {ArticleId: article.id}})
                        .then(() => res.status(200).json({ message: "Likes was deleted" }))
                        .catch(error => res.status(500).json({ error : `${error}` }));

                    // delete article image if there are
                    let filename = article.attachment ? article.attachment.split('/images/')[1] : null;
                    fs.unlink(`images/${filename}`, () => {
                        // delete article
                        article.destroy()
                            .then(() => {
                                res.status(200).json({ message: "Article was deleted" })
                            })
                            .catch(error => res.status(500).json({ error : `${error}` }));
                    })

                })
                .catch(error => res.status(500).json({ error : `${error}`}))
        })
        .catch(error => res.status(500).json({ error : `${error}` }))
}