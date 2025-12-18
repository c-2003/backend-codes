import User from "../models/User-model.js";
import AppError from "../utilis/error-utile.js";
import paymentGateway from "../config/RazarPay.config.js";
import crypto from "crypto";
import asyncHandler from "../middlewares/AsyncHandler.js";

export const getRazorpayApiKey = async(res,req,next)=>{
    try {
        res.status(200).json({
            success:true,
            message:"Razorpay Api Key is fetched successfully",
           key:process.env.RAZORPAY_API_KEY

        });
    } catch (error) {
        return next(
            new AppError(error.message, 500)
        );
    }

};

export const BuySubscription =async (res,req,next)=>{
    try {
        const {id} = req.user
    const user = await User.findById(id);
    if(!user)
        return next(
        new AppError('Unauthorised please login'))
    if(user.role == "ADMIN")
        return next(
            new AppError("Admin Cannot buy Subscription",400)
    )
    const subscription = await  paymentGateway.subscriptions.create({
        plan_id:process.env.RAZORPAY_SUBSCRIPTION_ID,
        customer_notify:1

    })
        user.subscription.id = subscription.id
        user.subscription.status = subscription.status

        await user.save()
        res.status(200).json({
            success:true,
            message:"Subscription is created successfully",
            subscription_id:subscription.id
        })
        
    } catch (error) {
        return next(
           new AppError(e.message,500)
        )
    }
    
};

export const verifySubscription = async (res,req,next)=>{
    try {
        const {id} = req.user
    const {razorpay_payment_id,razorpay_signature, razorpay_subscription_id} = req.body

    const user = await User.findById(id);
    if(!user){
        return next(
            new AppError('Unauthorised please login')
        )
    }
    
    const subscriptionId = user.subscription.id
    
    const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(`${razorpay_payment_id}|${subscriptionId}`)
    .digest('hex')
    if(generatedSignature !== razorpay_signature){
        return next(
            new AppError('Payment is not verify, please try again ',500)
        )
    }
        await Payment.create({
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
        })
        
        user.subscription.status = "ACTIVE"
        await user.save();
        res.status(200).json({
            success:true,
            message:"Subscription is verified successfully"

        })
        
    } catch (error) {
        return next(
            new AppError(e.message,500)
        )
    }
    
};

export const cancelSubscription = async (res,req,next)=>{
    try {
        const {id}  = req.user   
    const user = await User.findById(id);
    if(!user)
        return next(
        new AppError('Unauthorised please login'))
    if(user.role == "ADMIN")
        return next(
            new AppError("Admin Cannot buy Subscription",400)
    )

    const subscriptionId = user.subscription.id
    const subscription = await razorpay.subscriptions.retrieve(subscriptionId)
    await subscription.cancel()
    user.subscription.status = "CANCELLED"
    await user.save();
    res.status(200).json({
        success:true,
        message:"Subscription is cancelled successfully"
        })
        
    } catch (error) {
        return next (
            new AppError(e.message,500)
        )
    }
    
    
};

export const allPayments = asyncHandler(async (req, res, _next) => {
    const { count, skip } = req.query;
  
    // Find all subscriptions from razorpay
    const allPayments = await razorpay.subscriptions.all({
      count: count ? count : 10, // If count is sent then use that else default to 10
      skip: skip ? skip : 0, // // If skip is sent then use that else default to 0
    });
  
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
  
    const finalMonths = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };
  
    const monthlyWisePayments = allPayments.items.map((payment) => {
      // We are using payment.start_at which is in unix time, so we are converting it to Human readable format using Date()
      const monthsInNumbers = new Date(payment.start_at * 1000);
  
      return monthNames[monthsInNumbers.getMonth()];
    });
  
    monthlyWisePayments.map((month) => {
      Object.keys(finalMonths).forEach((objMonth) => {
        if (month === objMonth) {
          finalMonths[month] += 1;
        }
      });
    });
  
    const monthlySalesRecord = [];
  
    Object.keys(finalMonths).forEach((monthName) => {
      monthlySalesRecord.push(finalMonths[monthName]);
    });
  
    res.status(200).json({
      success: true,
      message: 'All payments',
      allPayments,
      finalMonths,
      monthlySalesRecord,
    });
  });


