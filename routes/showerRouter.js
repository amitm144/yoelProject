const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));


const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const showersController = require("../controller/showerController");
const { catchAsync, validateShower, isAdmin } = require("../utils/middleware");

// Routes for showers
router.route('/')
    .get(catchAsync(showersController.index))
    .post(catchAsync(showersController.index));

// router.route('/load').post(catchAsync(showersController.load));

// Routes for editing a shower
router.route('/edit/:id')
    .get(isAdmin, catchAsync(showersController.renderEditShower))
    .put(isAdmin, catchAsync(showersController.editShower));

// Routes for uploading a shower
router.route('/upload')
    .get(isAdmin, showersController.renderUploadShower)
    .post(isAdmin, upload.array('image'), validateShower, catchAsync(showersController.uploadShower));

// Route for deleting a shower
router.delete('/delete/:id', isAdmin, catchAsync(showersController.deleteShower));

module.exports = router;
