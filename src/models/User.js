const {Schema} = require('mongoose')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = new Schema({
    email:String,
    password:String
})

userSchema.methods.encryptPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.hashSync(10))
}
userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.password)
}

module.exports = mongoose.model('user',userSchema)