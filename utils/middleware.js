const { showerSchema } = require('./schemas.js');
const ExpressError = require('./ExpressError');


module.exports.catchAsync = func => {
    return(req, res, next) => {
        func(req, res, next).catch(next);
    }
}

module.exports.validateShower = (req, res, next) => {
    const { error } = showerSchema.validate(req.body.shower);
    console.log(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        next();
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()){
        req.flash('error','you are not an admin')
        return res.redirect('/showers')
    }
    next();
}

// module.exports.flash = (req, res, next) => {
//    res.locals.success = req.flash('success');
//    next();
// }