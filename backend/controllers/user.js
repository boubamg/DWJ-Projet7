const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const fs = require('fs');
const models = require('../models');

// Regex const 
const textRegex = /^[A-Za-z]{2,}$/
const emailRegex = /^[A-Za-z0-9_.+-]+\@[A-Za-z0-9_.+-]+\.[A-Za-z]+$/
const passwordRegex = /[\w]{7,15}/

const tokenKey = 'key';

// create account
exports.signup = (req,res) => {
    // get input value
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;

    // Regex verification 

    if(!textRegex.test(firstname)){
        return res.status(400).json({ error : "Firstname must contain only letters" })
    }

    if(!textRegex.test(lastname)){
        return res.status(400).json({ error : "Lastname must contain only letters" })
    }

    if(!emailRegex.test(email)){
        return res.status(400).json({ error : "Email syntax is not valid" + email });
    }

    if(!passwordRegex.test(password)){
        return res.status(400).json({ error : "Password must contain between 7 and 15 characters" });
    }

    // find user by email
    models.User.findOne({ 
        where: { email : email } 
        })
        .then(user => {
            // If user with this email already exist do :
            if(user) {
                return res.status(401).json({ error : "Email is already used"})
            // Else continue
            } else {
                // hash password 
                bcrypt.hash(password, 10)
                .then(hash => {
                    // create user with hash password
                    models.User.create({
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        password: hash,
                        isAdmin: false,
                    })
                    .then(() => res.status(201).json({ message: "User created" }))
                    .catch(err => res.status(400).json({ error: '' + err }))
                })
                .catch(err => res.status(500).json({ error : '' + err }))  }
            })
        .catch(err => res.status(500).json({ error : '' + err }))
}

// connect with account
exports.login = (req,res) => {

    // get input value
    let email = req.body.email;
    let password = req.body.password;

    // User in database ?
    models.User.findOne( { where: { email : email } })
        .then(user => {
            // no
            if(!user){
                return res.status(404).json({ error: "User not found"})
            }
            // user is deactivate
            if(!user.isActive){
                return res.status(405).json({ error: "Your account is deactivate, please contact administrator"})
            }
            // yes 
            bcrypt.compare(password, user.password)
            .then(valid => {
                // password is invalid
                if(!valid){
                    return res.status(401).json({ error: "Incorrect password"})
                }
                // return token and userId
                return res.status(201).json({
                    userId: user.id,
                    isAdmin: user.isAdmin,
                    token: jwt.sign(
                        {userId : user.id},
                        tokenKey,
                        { expiresIn: '12h'}) })
            })
            .catch(err => res.status(500).json({ error : `${err}` }))
        })
        .catch(err => res.status(500).json({ error : `${err}` }))
}

// get own profile
exports.getProfile = (req,res) => {
    // get token and decode it
    let token = req.headers.authorization.split(' ')[1]; 
    let decodedToken = jwt.verify(token, tokenKey);

    // find user where id is decodedToken.userId 
    models.User.findOne({
        attributes: ['email', 'lastname', 'firstname', 'profilePicture', 'biography' ],
        where: { id : decodedToken.userId} 
    })
    .then(user => {
        if(!user){
            return res.status(404).json({error : 'User not found'})
        }
        res.status(200).send(user)
    })
    .catch(err => res.status(500).json({ error : err }))
}

// update profile
exports.updateProfile = (req,res) => {
    // get token and decode it
    let token = req.headers.authorization.split(' ')[1];
    let decodedToken = jwt.verify(token, tokenKey);

    // find user where id is decodedToken.userId 
    models.User.findOne({ where : { id: decodedToken.userId}})
        .then(user => {
            // user not found
            if(!user){
                return res.status(404).json({ error : "User not found "})
            }

            // get new value
            let biography = req.body.biography ? req.body.biography : user.biography;
            let profilePicture = req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : user.profilePicture;

            // update info
            user.update({ 
                biography: biography,
                profilePicture: profilePicture
            })
            .then(() => { res.status(200).json({ message: 'Profile updated'}) })
            .catch(error => res.status(500).json({ error : `${error}` }));
        })
        .catch(error => res.status(500).json({ error : `${error}` }));
}

// delete account
exports.deleteAccount = (req,res) => {
     // get token and decode it
    let token = req.headers.authorization.split(" ")[1];
    let decodedToken = jwt.verify(token, tokenKey);

    // find user where id is decodedToken.userId 
    models.User.findOne({ where : { id : decodedToken.userId} })
        .then(user => {

            // user not found
            if(!user){
                return res.status(404).json({ error: "User not found" })
            }

            // find all articles created by the user
            models.Article.findAll({ where : { UserId : user.id }})
                .then(articles => {

                    articles.forEach( article => {

                        // delete like associated with the article or user likes
                        models.Like.destroy({ where : {
                            [Op.or]: [
                                { ArticleId: article.id },
                                { UserId: user.id }] } 
                        }).then(() => res.status(200).json({ message: "Likes was deleted" }))
                        .catch(error => res.status(500).json({ error : `${error}` }));
    
                        // delete comment associated with the article or user comment
                        models.Comment.destroy({ where : {
                            [Op.or]: [
                                { ArticleId: article.id },
                                { UserId: user.id }] } 
                        }).then(() => res.status(200).json({ message: "Comments was deleted" }))
                        .catch(error => res.status(500).json({ error : `${error}` }));
                    })

                    // delete all article created by a specific user
                    models.Article.destroy({ where : { UserId : user.id }})
                        .then(() => res.status(200).json({ message: "Articles was deleted" }))
                        .catch(error => res.status(500).json({ error : ' ' +error }));

                })
                .catch(error => res.status(500).json({ error : ' ' +error }));

                
            // delete user profilePicture if there are
            let filename = user.profilePicture ? user.profilePicture.split('/images/')[1] : null;
            fs.unlink(`images/${filename}`, () => {
            
            // delete user
            user.destroy()
                .then(() => {
                    res.status(200).json({ message: "User was deleted" })
                })
                .catch(error => res.status(500).json({ error : ' ' +error }));
            })

        })
        .catch(error => res.status(500).json({ error : `${error}` }));
}