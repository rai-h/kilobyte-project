const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = require('../config')
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    
  },
  phone: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
    unique:true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  type:{
   type: String,
   required: true,
   trim: true,
  },
  tokens:[{
    token:{
      type:String,
      required:true,
    }
  }]
})

userSchema.methods.genenrateTokens= async function(){
  const user = this

  token = jwt.sign({_id: user._id.toString()},key)
  user.tokens = user.tokens.concat({token})
  await user.save()

  return token

}

userSchema.pre('save',async function(next){
  const user = this
if(user.isNew){
  user.password = await bcrypt.hash(user.password,8)
  next()
}else{
  next()}
})

const User = mongoose.model("User", userSchema);

module.exports = User;
