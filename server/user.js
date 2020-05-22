const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    username:String,
    room:String,
    socketId:String,
    messages:[{
        timestamp:String
    }],
    
})

const User = mongoose.model('User',userSchema)

module.exports=User