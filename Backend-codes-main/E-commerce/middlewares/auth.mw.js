const user_model = require("../Models/User-Model"); // Assuming correct file path
const jwt = require("jsonwebtoken"); // Assuming correct file path
const auth_config = require("../configs/Auth.config")

// Create middleware for signup body verification
async function VerifySignUpBody(req, res, next) {
  try {
    // Check for required fields
    if (!req.body.name) {
      return res.status(400).send({ message: 'Name is required' });
    }

    if (!req.body.email) {
      return res.status(400).send({ message: 'Email is required' });
    }

    if (!req.body.userId) {
      return res.status(400).send({ message: 'User ID is required' });
    }

    // Check for existing user with the same ID
    const existingUser = await user_model.findOne({ userId: req.body.userId });
    if (existingUser) {
      return res.status(400).send({ message: 'User ID already exists' });
    }

    // Validation might be more comprehensive using Joi or similar libraries

    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error("Error during signup body validation:", error);
    res.status(500).send({ message: "Error validating signup body" });
  }
}
// signinbody
  async function VerifySignInBody (req, res,next) {
    if(!req.body?.userId){
        // implement  logic here
        return res.status(400).send({ message: 'User ID is required' });
    }
    if(!req.body.password){
        // implement  logic here
        return res.status(400).send({ message: 'Please enter the password' });
    }
    next()
}
  const verifyToken =  (req,res,next) =>{
    // checking token is present in header
    const token = req.headers['x-access-token']
    if(!token){
      return res.status(403).send({ message: 'No token provided.'})
      }
    //Token is valid or not
      jwt.verify(token, auth_config.secret, async (err, decoded) => {
        if (err) {
          return res.status(401).send({ message: 'Failed to authenticate token'})
        }
        const user = await user_model.findOne({userId:decoded.id})
        if(!user){
          return res.status(400).send({ message: 'UnAuthorised  this user for this token is not matching'})
        }
        req.user = user
        next()
      })
     
  }
  // checking admin or not for creating cartegory
 const isAdmin = async (req, res, next) => {
  const user = req.user;
  if (user && user.userType == "ADMIN"){
      next();
  }else{
      return res.status(403).send({
          message : "only ADMIN users are allowed to access this endpoint"
      })
  }
 }

module.exports = {
  VerifySignUpBody: VerifySignUpBody,
  VerifySignInBody:VerifySignInBody,
  verifyToken:verifyToken,
  isAdmin:isAdmin
};
