const express = require('express')
const { getAllBlogsController, CreateBlogController, UpdateBlogController, GetBlogIdController, DeleteBlogController, UserBlogController } = require('../controllers/blogCotroller')

//router object 
const router= express.Router()
// get|| all blog
router.get('/all-blog',getAllBlogsController)

// post  || all create blog
router.post('/create-blog',CreateBlogController)

// PUT || update Blog 
router.put('/update-blog/:id',UpdateBlogController)

// GET || Single Blog Details
router.get('/get-blog/:id',GetBlogIdController)

// DELETE || DElete Blog
router.delete('/delete-blog/:id',DeleteBlogController)
// GET || User Blog
router.get('/user-blog/:id', UserBlogController)


module.exports=router