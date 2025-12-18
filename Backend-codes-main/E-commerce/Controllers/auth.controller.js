// here we  write the logic for controller to  handle user register
const bcrypt = require('bcrypt');
const user_model = require( "../Models/User-Model")
const jwt = require('jsonwebtoken');
const secrets = require("../configs/Auth.config")
exports.signup  = async (req, res) => {
// here write code to cretae user  in database and send response back to client side//
// read the request body
 const request_body =  req.body;

 const userObj = {
    name:request_body.name ,
    userId:request_body.userId ,
    password : bcrypt.hashSync(request_body.password,8) ,
    email:request_body.email,
    userType:request_body.userType
 }
 try {
    const user_created = await user_model.create(userObj)

    const res_obj ={
      name: user_created.name,
      userId: user_created.userId,
      email:user_created.email,
      userType:user_created.userType,
      createdAt :user_created.createdAt,
      updatedAt:user_created.updatedAt
    }

    res.status(201).send(res_obj);
 } catch (error) {
   console.log("Error in registering user ", error) 
   res.status(500).send({
    message:"some error happened  while creating account"
    
    })
 }

}

exports.signin = async(req,res) => {

   // check user present in system //
const user =  await user_model.findOne({userId: req.body.userId})

  if(user == null){
    return  res.status(404).send({
      message:"Userid pass is not vaild for user id "
   })
  }
   // if present then check password
   const isPasswordVaild = bcrypt.compareSync(req.body.password, user.password)
   if(!isPasswordVaild){
      return res.status(401).send({
         message:"Wrong password passed"
      })
   }
   // we will create acess token with jwtoken 
   const  token = jwt.sign({id:user.userId}, secrets.secret,{
      expiresIn:180
   })

   res.status(200).send({
      name: user.name,
      userId:user.userId,
      email:user.email,
      userType:user.userType,
      accessToken:token,
    
   })

}