const express = require('express');
const blogController = require('../controllers/createBlog.controller');
const categoryController = require('../controllers/categories.controller');
const router = express.Router();

router.get('/',(request,response)=>{
    response.render('dashboard',{title:'Admin Dashboard'});
})

router.get('/create-blog',async (request,response)=>{
    const categories = await categoryController.getCategories();
    response.render('dashboard-contents/createBlog',{
        title:'Write Blog',
        categories:categories
    });
})

router.get('/categories',async (request,response)=>{
    const data = await categoryController.getCategories();
    response.render('dashboard-contents/categories',{
        title:'Categories',
        categories:data
    });
})

router.get('/all-blogs',async (request,response)=>{
    const data = await blogController.getAllBlogs();
    const categories = await categoryController.getCategories();
    response.render('dashboard-contents/allBlogs',{
        title:'Blogs',
        data:data,
        categories:categories
    });
})

module.exports = router;