// npm run start:server
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

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

app.post('/api/posts' , (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post Added Successfully'
    });
});

app.get('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: 'ffdjakslfdklsa', 
            title: 'First Server-Side Post', 
            content: 'This is coming from the server'
        },
        {
            id: 'fjfkfjdkjfkkkkk', 
            title: 'Second Server-Side Post', 
            content: 'This is coming from the server!'
        }
    ];
    res.status(200).json({
        message: 'Posts fetched succesfully',
        posts: posts
    });
});

module.exports = app;