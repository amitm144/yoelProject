const express = require('express');
const router = express.Router();

const { catchAsync } = require("../utils/middleware");
const passport = require('passport');

const adminController = require("../controller/adminController");

// Register Admin Routes
router.route('/registeradmin')
    .get(adminController.renderRegisterPage)
    .post(catchAsync(adminController.createAdmin));

// Login Routes
router.route('/login')
    .get(adminController.renderLoginPage)
    .post(passport.authenticate(
        'local',
        { failureFlash: true, failureRedirect: '/admin/login' }),
        catchAsync(adminController.login)
    );

// Logout Route
router.get('/logout', adminController.logout);

module.exports = router;
