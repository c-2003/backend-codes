import {Router} from 'express'
import { allPayments, BuySubscription, cancelSubscription, getRazorpayApiKey,  verifySubscription } from '../controllers/Payment-controller.js';
import {isLoggedIn,  authorizedRoles } from "../middlewares/auth_middle.js";

const router = Router();

router.get('/razorpay-key',isLoggedIn,getRazorpayApiKey)
router.post('/subscribe',isLoggedIn, BuySubscription)
router.post('/verify',isLoggedIn,verifySubscription)

router.post('/cancel',isLoggedIn,cancelSubscription)
router.get('/',isLoggedIn,authorizedRoles('ADMIN'),allPayments)

export default router;