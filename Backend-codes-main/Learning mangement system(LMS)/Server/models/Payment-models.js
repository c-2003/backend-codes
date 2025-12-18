import  {Schema, model} from "mongoose"

const paymentSchema = new Schema({
    Payment_gateway_id:{
        type:String,
        required:true

    },
    Subscription_gateway_id:{
    type:String,
    required:true,
},
    Payment_gateway_signature:{
        type:String,
        required:true,

    },
},{
    timestamps:true
    
}) 

const Payment = model("Payment",paymentSchema)
export default Payment