const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:[true, "username is required"],
        },
        email:{
            type:String,
            required:[true,"email is required"]
        },
        password: {
           type:String,
           required:[true,"password is  required"],
        },
        blogs:[
            {
                type:mongoose.Types.ObjectId,
                ref:"Blog",
            }
        ]
    },
    {timestamps:true}
)
const UserModel = mongoose.model("user",UserSchema)
module.exports = UserModel;