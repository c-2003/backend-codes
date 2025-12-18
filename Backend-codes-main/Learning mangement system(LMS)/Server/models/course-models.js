import {model, Schema} from 'mongoose'

const courseSchema = new Schema({
    title:{
        type:String,
        required:[true, "title is required"],
        minlength:[8, 'title length should atleats 8 char '],
        maxlength:[60, 'title length not exceed more than 60'],
        unique:true,
        trim:true,
    },
    description:{
        type:String,
        required:[true, "Description is required"],
        minlength:[20, 'description length should atleats 20 char '],
        maxlength:[250, 'description length not exceed more than 250'],
        trim:true,

    },
    category:{
        type:String,
        required:[true, "category is required"],
        trim:true,

    },
    thumbnail:{
        public_id:{
            type:String,
            required:[true, "public_id is required"],
            trim:true,

        },
        secure_url:{
            type:String,
            required:[true, "secure_url is required"],
            trim:true,

        }
        
    },
    lectures:[
        {
            title:String,
            description:String,
            lecture:{
                public_id:{
                    type:String,
                    required:[true, "public_id is required"],

                },
                secure_url:{
                    type:String,
                    required:[true, "secure_url is required"],
                }
            }
        }
    ],
    numberOfLectures:{
        type:Number,
        default:0,
    },
    createBy:{
        type:String,
        required:true
    }
    
    },{
        timestamps:true

    })

    const Course = model('Course',courseSchema)
   export default Course