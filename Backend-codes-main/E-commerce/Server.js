/**
 * this is a starting file of  the project 
  
 */
const express = require("express")
const mongoose = require('mongoose')
const  app = express()
const server_conf = require("./configs/server.configs")
const db_config =require ("./configs/DB.config");
const user_model = require( "./Models/User-Model")
const bcrypt = require('bcrypt');

app.use(express.json()) // to parse json data from

// crate an admin user at staring of the app
// if not already present 


//Connection with mongodb 
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection;
db.on("error",()=>{
    console.log("Error in connecting to database ", );
    
})
db.once("open", () => {
     // Calling routes  here'
     console.log("Connected to Database ");
     init()
})

 async function init(){
    
       let user = await user_model.findOne({userId:"admin"})

        if(user){
         console.log("Admin User Already Present")
         return
    }
   
    try {
        user = await user_model.create({
            name:"mayank",
            userId:"admin",
            email: 'mayank@gmail.com',
            password:bcrypt.hashSync('1234567890' , 10),
            userType: "ADMIN",
        })
        console.log("Admin User Created Successfully : ",user);
        
    } catch (err) {
        console.error("Error creating admin user:", err); 
    }
}

// // route the a server//
require("./Routes/Auth.routes")(app)
require("./Routes/category.routes")(app)

// start server //

app.listen(server_conf.PORT, () => {
    console.log('Server started at ',server_conf.PORT)
})


