const Blog = require('../models/blogModel')
const mongoose = require('mongoose')

const getuserBlogs = async (req, res) => {
    const user_id = req.user._id
    const blogs = await Blog.find({user_id}).sort({createdAt: -1})
    res.status(200).json(blogs)
}

const getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({createdAt: -1})
    res.status(200).json(blogs)
}

const getBlog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such Blog'})
    }
    const blog = await Blog.findById(id)
    if (!blog) {
        return res.status(404).json({error: 'No such Blog'})
    }
    res.status(200).json(blog)
}

const createBlog = async (req, res) => {
    const {title, tags, description,url, user_name} = req.body
    let emptyFields = []
    if (!title) {emptyFields.push('title')}
    if (!tags) {emptyFields.push('tags')}
    if (!description) {emptyFields.push('description')}
    if (!url) {emptyFields.push('image')}
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    try {
        const user_id = req.user._id
        let blog  = new Blog
        blog = await Blog.create({ title, tags, description, url, user_id,user_name })
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteBlog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such blog'})
    }
    const blog = await Blog.findOneAndDelete({_id: id})
    if(!blog) {
        return res.status(400).json({error: 'No such blog'})
    }
    res.status(200).json(blog)
}

const updateBlog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: 'No such blog'})
    }
    const blog = await Blog.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    if (!blog) {
        return res.status(400).json({error: 'No such blog'})
    }
    res.status(200).json(blog)
}

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog,
    getuserBlogs
}