// Post  localhost:8888/ecomm/api/v1/auth/
// i need to intercepet ///

const authController = require( "../Controllers/auth.controller");
const authMW = require("../middlewares/auth.mw");

module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup",[authMW.VerifySignUpBody],authController.signup)

    // createing routes in signin
    app.post("/ecomm/api/v1/auth/signin",[authMW.VerifySignInBody],authController.signin)
}