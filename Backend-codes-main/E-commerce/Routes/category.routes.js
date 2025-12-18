const category_Auth = require('../Controllers/category.controller')
const auth_aw = require("../middlewares/auth.mw")

module.exports=(app)=>{
    app.post('/ecomm/api/v1/categories',[auth_aw.verifyToken,auth_aw.isAdmin],category_Auth.createNewCategory)
}
