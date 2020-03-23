var createError = require('http-errors');

const authAdmin = async(req, res, next) => {
    let user = req.user;
    if(user && user.isAdmin) {
        next();
    }else{
        next(createError(403));
    }
};
module.exports = authAdmin;
