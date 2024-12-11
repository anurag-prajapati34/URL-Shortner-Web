const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({

userAuthId:{
    type:String,
    required:true,
},
userName:{
    type:String,
},
urls:[
    
       Object
    
],


})

const UserModel=mongoose.model('users',userSchema)
module.exports=UserModel