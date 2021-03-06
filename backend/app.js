// dependencies importation
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

// Routes importation
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const commentRoutes = require('./routes/comment');
const likeRoutes = require('./routes/like');

const app = express();

// middlewares
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

//routes
app.use('/api/user', userRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/comment/article', commentRoutes);
app.use('/api/like/article', likeRoutes)


module.exports = app;