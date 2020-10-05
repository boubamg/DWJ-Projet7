const models = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const tokenKey = "key";

// create comment
exports.createComment = (req,res) => {
    // get token and decode it
    let token = req.headers.authorization.split(" ")[1]
    let decodedToken = jwt.verify(token, tokenKey);

    // find user where id is decodedToken.userId
    models.User.findOne({ where : { id : decodedToken.userId } })
        .then(user => {
            // if user not found
            if(!user){
                return res.status(404).json({ error : " User not found" })
            }
            // else find article where id is in params
            models.Article.findOne({ where : { id : req.params.articleid } })
                .then(article => {
                    // if user not found
                    if(!article){
                        return res.status(404).json({ error : " Article not found" })
                    }

                    // create comment 
                    models.Comment.create({
                        commentText: req.body.comment,
                        UserId : user.id,
                        ArticleId : article.id
                    })
                    .then(() =>  res.status(201).json({ message: "Comment was created" }))
                    .catch(error => res.status(500).json({ error : `${error}` }));
                })
                .catch(error => res.status(500).json({ error : `${error}` }))
        })
        .catch(error => res.status(500).json({ error : `${error}` }))
}

// get all comments
exports.getComments = (req,res) => {
    let token = req.headers.authorization.split(" ")[1]
    let decodedToken = jwt.verify(token, tokenKey);

    // find user where id is decodedToken.userId
    models.User.findOne({ where : { id: decodedToken.userId }})
        .then(user => {
            // if user not found
            if(!user){
                return res.status(404).json({ error: "User not found" })
            }
            
            models.Article.findOne({ where : { id: req.params.articleid }})
                .then(article => {
                    // if article not found
                    if(!article){
                        return res.status(404).json({ error: "Article not found" })
                    }
                    // find all comment where comment.ArticleId is article.id
                    models.Comment.findAll({ where : 
                        { ArticleId : article.id },
                        // include user who commented
                        include : {
                            model: models.User,
                            attributes: ['firstname', 'lastname', 'profilePicture'],
                            where: {
                                id: {[Op.col] : 'Comment.UserId'}
                            }
                        }
                    })
                        .then(comments => res.status(200).send(comments))
                        .catch(error => res.status(500).json({ error : `${error}` }))
                })
                .catch(error => res.status(500).json({ error : `${error}` }))
        })
        .catch(error => res.status(500).json({ error : `${error}` }))
}

// update selected comment
exports.updateComment = (req,res) => {
    // get token and decode it
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token, tokenKey)

    // find user where id is decodedToken.userId
    models.User.findOne({where : { id : decodedToken.userId }})
        .then(user => {
            // if user not found
            if(!user){
                return res.status(404).json({ error: "User not found" })
            }
            // find article by id
            models.Article.findOne({ where : { id: req.params.articleid }})
                .then(article => {
                      // if article not found
                    if(!article){
                        return res.status(404).json({ error: "Article not found" })
                    }
                    // find comment by id
                    models.Comment.findOne({ where : { id : req.params.id } })
                        .then(comment => {
                            // if comment not found
                            if(!comment){
                                return res.status(404).json({ error: "Comment not found" })
                            }
                            // verify if user is the creator of comment
                            if(comment.UserId !== user.id){
                                return res.status(401).json({ error: "You cannot do this" })
                            }
                            // update comment
                            comment.update({
                                commentText: req.body.comment
                            })
                            .then(() => res.status(201).json({ message: "Comment was updated" }))
                            .catch(error => res.status(500).json({ error : `${error}` }))
                        })
                        .catch(error => res.status(500).json({ error : `${error}` }))
                })
                .catch(error => res.status(500).json({ error : `${error}` }))

        })
        .catch(error => res.status(500).json({error : `${error}`}))
}

// delete selected comment
exports.deleteComment = (req,res) => {
    // get token and decode it
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token, tokenKey)

    // find user where id is decodedToken.userId
    models.User.findOne({ where : { id : decodedToken.userId }})
        .then(user => {
            // if user not found
            if(!user){
                return res.status(404).json({ error: "User not found" })
            }
            // find article by id
            models.Article.findOne({ where : { id: req.params.articleid }})
                .then(article => {
                    // if article not found
                    if(!article){
                        return res.status(404).json({ error: "Article not found" })
                    }

                    // find comment by id
                    models.Comment.findOne({ where : { id : req.params.id } })
                        .then(comment => {
                            // if comment not found
                            if(!comment){
                                return res.status(404).json({ error: "Comment not found" })
                            }
                            // verify if user is the creator of comment or administrator
                            if(comment.UserId !== user.id && !user.isAdmin){
                                return res.status(401).json({ error: "You cannot do this" })
                            }
                            // delete comment
                            comment.destroy()
                            .then(() => res.status(201).json({ message: "Comment was deleted" }))
                            .catch(error => res.status(500).json({ error : `${error}` }))
                        })
                        .catch(error => res.status(500).json({ error : `${error}` }))
                })
                .catch(error => res.status(500).json({ error : `${error}` }))

        })
        .catch(error => res.status(500).json({error : `${error}`}))
}