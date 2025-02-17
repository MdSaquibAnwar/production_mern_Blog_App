// here requre the databse model for storing the user data
const bcrypt= require('bcrypt');
const UserModel = require('../models/UserModel')





//create user register user
exports.registerController = async (req,res)=>{
    try{
        const {username , email , password} = req.body
        // validation
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:'please fill all fields'
            })
        }
        //exisiting user 
        const exisitingUser = await UserModel.findOne({ email })
        if(exisitingUser){
            return  res.status(401).send({
                success:false,
                message:'user already existing'
            })
        }
        // download bcrypt and using bcrypt hashpassword change the password in hased
        const hashpassword = await bcrypt.hash(password,10)
        // save  new user
        const user = new UserModel({username,email,password:hashpassword})
        await user.save()
        return res.status(200).send({
            success:true,
            message:'New User Created'
        })
   
    }catch(error){
       console.log(error)
       return res.status(500).send({
           message:'Error in Registration '
       })
   
    }
}

//get all users
exports.getAllusers =  async (req,res)=>{
    try{
        const users = await UserModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success:true,
            message:'all user data',
            users

        })

    } catch (error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in Get All users",
            error,
        })
    }
}

// login form
exports.loginController = async  (req,res)=>{
 try{
   const {email,password} =req.body
//    validation
if(!email || !password){
    return res.status(401).send({
      success:false,
      message:'please provide email or password '
    })
}
// debugging email and password
console.log("here is email and password",email,password)
const user = await UserModel.findOne({email})
console.log(user)
if(!user){
    return res.status(200).send({
        success:false,
        message:'email is not registarted'
    })
}
const isMatch= await bcrypt.compare(password,user.password)
console.log("ismatch",isMatch)//debugging 
// validation
if(!isMatch){
    return res.status(401).send({
        success:false,
        message:'invalid username or password'
    })
} 
return res.status(200).send({
    success:true,
    message:"login succesfully",
    user
})

 }catch(error){
    console.log(error)
    return res.staus(500).send({
        success:false,
        message:'Error in login callback',
        error
    })
 }
}


