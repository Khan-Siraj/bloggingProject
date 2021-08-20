var express = require('express');
var router = express.Router();
const blogController = require('../controllers/createBlog.controller');
const categoryController = require('../controllers/categories.controller');
/* GET home page. */
router.get('/', async function(req, res, next) {
  const categories = await categoryController.getCategories();
  const blogs = await blogController.getLimitedBlogs();
  res.render('index', { 
    title: 'Blogging',
    categories:categories,
    blogs:blogs
  });
});

module.exports = router;
