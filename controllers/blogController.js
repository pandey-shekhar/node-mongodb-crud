const Blog = require('../models/Blog');
const mongoose = require('mongoose');

exports.getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({ status: 'active' });
        res.status(200).json({
            result: 1,
            msg: "Blogs list fetched successfully.",
            data: blogs
        });
    } catch (error) {
        next(error);
    }
};

exports.getBlogById = async (req, res, next) => {
    try {
        const { id } = new Blog(req.body);
        const blogs = await Blog.findOne({ _id: id, status: 'active' });
        res.status(200).json({
            result: 1,
            msg: "Blog fetched successfully.",
            data: blogs
        });
    } catch (error) {
        next(error);
    }
};

exports.createBlog = async (req, res, next) => {
    try {
        const newBlog = new Blog(req.body);
        const savedBlog = await newBlog.save();
        res.status(201).json({
            result: 1,
            msg: "Blog created successfully.",
            data: savedBlog
        });
    } catch (error) {
        next(error);
    }
};

exports.editBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                result: -1,
                error: "Invalid Blog ID!" 
            });
        }
        const existingBlog = await Blog.findOne({ _id: id, status: 'active' });
        if (!existingBlog) {
            return res.status(404).json({ 
                result: -1,
                error: "No active blog found!" 
            });
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            result: 1,
            msg: "Blog updated successfully.",
            data: updatedBlog
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                result: -1,
                error: "Invalid Blog ID!" 
            });
        }
        const existingBlog = await Blog.findOne({ _id: id, status: 'active' });
        if (!existingBlog) {
            return res.status(404).json({ 
                result: -1,
                error: "No active blog found!" 
            });
        }
        existingBlog.status = 'deleted';
        await existingBlog.save();
        res.status(200).json({
            result: 1,
            msg: "Blog deleted successfully.",
            data: existingBlog
        });
    } catch (error) {
        next(error);
    }
};