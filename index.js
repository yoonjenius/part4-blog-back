const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
});

blogSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Blog = mongoose.model('Blog', blogSchema);

const mongoUrl = 'mongodb://localhost:27017/bloglist';
mongoose.connect(mongoUrl, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true});

app.use(cors());
app.use(express.json());

app.get('/api/blogs', (request, respose)=>{
    Blog.find({}).then(blogs => {
        respose.json(blogs);
    });
});
app.post('/api/blogs', (request, response)=>{
    const blogObject = new Blog(request.body);
    blogObject.save().then(result=>{
        response.status(201).json(result);
    });
});

const PORT = 3003;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});