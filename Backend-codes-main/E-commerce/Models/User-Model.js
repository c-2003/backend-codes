const mongoose = require('mongoose')

/*
 * Define a schema for the user model.
 Name
 Email 
 password 
 userID
 userType
 */

 const userSchema = new mongoose.Schema({
     name: { 
        type: String, 
        required: true 
    },
     email:
      {
        type:String,
        unique:true,
        required: true,
        minlength:10, 
        lowercase:true,
        },
      password:
     {
        type: String,
        required: true
    },
    userId:
    {
        type:String,
        unique:true,
        required:true
          
    }, 
    userType :{
        type:String,
        enum: ['CUSTOMER', 'ADMIN'], // only allow "User" or "Admin".
        default:'CUSTOMER',
        require:true,
    }
    
 },{timestamps:true, versionKey:false});

 module.exports = mongoose.model('User', userSchema);
