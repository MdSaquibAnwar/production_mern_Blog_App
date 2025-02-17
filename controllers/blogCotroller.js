// here i requre blogModel from models , there also create all bog catogries
// const mongoose  = require('mongoose')
const  blogModel=require('../models/blogModel')
const UserModel = require('../models/UserModel')
// const { subscribe } = require('../routes/blogRotes')

// GET ALL BLOGS   i have also create in 
exports.getAllBlogsController = async (req,res)=>{
 try{
    const blogs = await blogModel.find({}).populate('user');
    if(!blogs){
        return  res.status(201).send({
            success:false,
            message:'No Blog Found'
        })
    }
    return res.status(200).send({
        success:true,
        BlogCount:blogs.length,
        message:'All Blog List ',
        blogs,
    })

 }catch(error){
    console.log(error)
    return res.status(500).send({
        success:false,
        message:'Error while Getting Blogs'
    })
 }
}
// create Blog 
exports.CreateBlogController = async (req,res)=>{
    try{
        const {title,description,image,user} =req.body
        console.log( " here is the  image and all",title,description,image,user)// debugging 
        // validation 
        if(!title || !description || !image || !user){
            return res.status(400).send({
                success:false,
                message:"Please fill the title and description and image",

            })
        }
        const exisitinguser = await UserModel.findById(user)
        console.log("this is exisitingUser",exisitinguser)
        if(!exisitinguser){
            return res.status(404).send({
                success:false,
                message:'unable to find user'
            })
        }
        const newBlog = new blogModel({title,description,image,user})
        console.log("this is my new  Blog",newBlog) //thhis is for debugging 
        await newBlog.save();
        exisitinguser.blogs.push(newBlog);
        await exisitinguser.save();
        return res.status(200).send({
           success:true,
           message:"Blog Creater",
           newBlog, 
        })  

        

    }catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'Error While Creating Blog ',
            error
        })
    }

}
// Update Blog 

exports.UpdateBlogController = async (req,res)=>{
    try{
        const {id} = req.params
        const {title,description,image} =req.body
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message:'blog updating Blog',
            blog
        })

    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"the Error is updaBlog on callback"

        })
    }

}
// Single Blog
exports.GetBlogIdController = async( req,res)=>{
 try{
    const {id} = req.params
    const blog =await blogModel.findById(id)
    if(!blog){
        return res.status(401).send({
            success:false,
            message:"blog not found with this id"
        })
    }
    return res.status(200).send({
        success:true,
        message:'fetch single blog',
        blog
    })


 }catch(error){
    console.log(error)
    return res.status(400).send({
        success:false,
        message:"Error in GetBlog ID ,callback",
        error
    })
 }
}

// delete Blog
exports.DeleteBlogController = async (req,res)=>{
    try{
    //  const blog = await blogModel.findOneAndDelete(req.params.id).populate("user");// i can acces the user id direct using await and also from params
    const blog = await blogModel.findOneAndDelete(req.params.id).populate('user')
     await blog.user.blogs.pull(blog)
     await blog.user.save();
    console.log("this is my blog ",blog)
    return res.status(200).send({
        success:true,
        message:"blog deleted  "
    })



    }catch(error){
        console.log(error)
        return res.status(400).send({
            success:false,
            message:'We are Getting Error from callback in delete block controller'
        })
    }

}

// GET USER BLOG
exports.UserBlogController =async  (req,res) =>{
 try{
    const userBLog  = await UserModel.findById(req.params.id).populate('blogs') //i get the user all blog 
    if(!userBLog){
        return res.status(401).send({
            success:false,
            message:"plesae create your blog"
        })
    }

    return res.status(200).send({
        success:true,
        message:"user Blog",
        userBLog
    })

 }catch(error){
    console.log(error)
    return res.status(400).send({
        success:false,
        message:"this is callback from UserBlogController",
        error
    })
 }
}