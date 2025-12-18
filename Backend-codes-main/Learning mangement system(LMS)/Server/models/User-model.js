import mongoose, {Schema, model} from "mongoose"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const userSchema = new Schema({
   fullName:{
    type: String,
    required:[true, "Name is required"],
    minlength:[6,"Name must be six character"],
    maxlength:[20,"Name must be 20 character"],
    lowercase:true,
    trim:true
   },
   email:{
    type: String,
    required:[true, "Email is required"],
    unique:true,
    lowercase:true,
    trim:true,
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/," Please fill Email is valid"]

   },
   password:{
    type: String,
    required: [true, "Password is required"],
    minlength:[6,"Pass must be six character"],
    trim:true,
    select:false
   },
   avatar:{
    public_id:{
        type:String,
    },
    secure_url:{
        type:String,
    },

   },
   role:{
     type:String,
     enum:["USER","ADMIN"],
   },
   forgotPasswordToken:String,
   forgotPasswordExpire:Date,
   subscription:{
        id:String,
        status:String

   }
},
{
    timestamps:true,
    versionKey:false
})

    userSchema.pre('save',async function(next){
        if(!this.isModified('password')){
            return next()
        }
        this.password = await bcrypt.hash(this.password, 10)
       
    })
        userSchema.methods = {
            generateJwtToken: async function(){
            return await jwt.sign(
                {_id:this._id,role:this.role,email:this.email,subscription:this.subscription},process.env.JWT_SECRET,
                {expiresIn: process.env.JWT_EXPIRY})
            
        },
        comparePassword: async function(plainTexTPassword){
            return await bcrypt.compare(plainTexTPassword,this.password)
        },
        generateResetPasswordToken:async function(){
            const resetToken = crypto.randomBytes(20).toString('hex')

            this.forgotPasswordToken =crypto
            .createHash("256")
            .update(resetToken)
            .digest('hex')
            this.forgotPasswordExpire = new Date(Date.now() + 20*60*100) // 20 from now

            return resetToken
        }
    }

    

 const User = model("User",userSchema)
 export default User