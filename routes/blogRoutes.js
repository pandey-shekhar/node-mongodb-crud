const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/getAllBlogs', blogController.getAllBlogs);
router.post('/getBlogById', blogController.getBlogById);
router.post('/createBlog', blogController.createBlog);
router.put('/editBlog/:id', blogController.editBlog);
router.put('/deleteBlog/:id', blogController.deleteBlog);

module.exports = router;