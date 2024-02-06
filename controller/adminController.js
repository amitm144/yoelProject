const Admin = require('../models/adminModel');

// Render the registration page
module.exports.renderRegisterPage = (req, res) => {
    res.render('users/register');
};

// Create a new admin user
module.exports.createAdmin = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new Admin({ email, username });
        const registerAdmin = await Admin.register(user, password);
        req.flash('success', 'Welcome!');
        res.redirect('/showers');
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/admin/registeradmin');
    }
};

// Render the login page
module.exports.renderLoginPage = (req, res) => {
    res.render('users/login');
};

// Perform login action
module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/showers');
};

// Logout the user
module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/showers');
    });
};
