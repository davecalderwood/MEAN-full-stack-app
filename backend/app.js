// npm run start:server
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://dcalderwood:imC9M7hnuPPV7mUX@cluster0-wgbju.mongodb.net/node-angular?retryWrites=true&w=majority")
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch(() => {
        console.log('Connection Falied!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Post data
app.post('/api/posts' , (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(result => {
        res.status(201).json({
            message: 'Post Added Successfully',
            postId: result._id
        });
    });
});

// Get data
app.get('/api/posts', (req, res, next) => {
    Post.find().then(documents => {
        res.status(200).json({
            message: 'Posts fetched succesfully',
            posts: documents
        });
    });
});

// Delete data
app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result)
    });
    res.status(200).json({ message: 'Post Deleted' });
});

module.exports = app;