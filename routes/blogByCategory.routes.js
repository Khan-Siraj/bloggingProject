const express = require('express');

const router = express.Router();
const blogController = require('../controllers/createBlog.controller');
const categoryController = require('../controllers/categories.controller');

router.get('/:category',async (request,response)=>{
    const categoryName = request.params.category;
    const categories = await categoryController.getCategories(request,response);
    const blogs = await blogController.getBlogsByCategory(request,response);
    response.render('categoryBlog',{ 
        title: categoryName,
        categories:categories,
        blogs:blogs
      });
})
module.exports = router;