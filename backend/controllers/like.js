const models = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const tokenKey = "key";

// like article
exports.likeArticle = (req,res) => {
    // get token and decode it
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, tokenKey);

    // find user where id is decodedToken.userId 
    models.User.findOne({ where: { id: decodedToken.userId }})
        .then(user => {
            // user not found
            if(!user){
                return res.status(404).json({ message : "User not found" })
            }

            // find article by id
            models.Article.findOne({ where: { id: req.params.articleid }})
                .then(article => {
                    // article not found
                    if(!article){
                        return res.status(404).json({ message : "Article not found" })
                    }       
                    // find like where ArticleId is article.id AND UserId: user.id
                    models.Like.findOne({ where : {
                        [Op.and]: [
                          { ArticleId: article.id },
                          { UserId: user.id }
                        ]
                      }})
                      .then(like => {
                          // like not found
                          if(!like){
                            // create like with user and article liked
                            models.Like.create({
                                UserId: user.id,
                                ArticleId: article.id,
                            })
                            .then(() => res.status(201).json({ message: "Like row was created"}))
                            .catch(error => res.status(500).json({ error : `${error}` }))

                            // add 1 like in article 
                            article.update({
                                likes : article.likes + 1
                            })
                            .then(() => res.status(200).json({ message: "Liked"}))
                            .catch(error => res.status(500).json({ error : `${error}` }))

                            // like already exist
                          } else {

                            // delete like row
                            like.destroy()
                            .then(() => res.status(200).json({ message : "Like row was deleted" }))
                            .catch(error => res.status(500).json({ error : `${error}`}))
                          
                                // remove 1 like in article 
                                article.update({
                                    likes : article.likes - 1
                                })
                                  .then(() => res.status(200).json({ message : "Like taking off" }))
                                  .catch(error => res.status(500).json({ error : `${error}`}))
                            }    
                      })
                      .catch(error => res.status(500).json({ error : `${error}` }))     
                    })
                .catch(error => res.status(500).json({ error : `${error}` }))
        })
        .catch(error => res.status(500).json({ error : `${error}` }))
}
