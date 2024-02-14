const Shower = require('../models/showerModel');
const { features, translationMap, transformations, applyTransformations } = require('../utils/showerConstants');

// Display a list of showers based on selected features
module.exports.index = async (req, res) => {
    const selectedFeatures  = req.body.selectedFeatures;
    const currentPage =  req.body.page || 1;

    const limit = 18;
    const count = await Shower.find(selectedFeatures).count();
    const totalPages = Math.floor(count/limit);

    const showers = await Shower
                                .find(selectedFeatures)
                                .skip((currentPage-1)*limit)
                                .limit(limit);
    let type = 'index';
    res.render('shower/index', { showers, features, translationMap, selectedFeatures, type , currentPage , totalPages});
};


// Render the edit shower page
module.exports.renderEditShower = async (req, res) => {
    const { id } = req.params;
    let type = 'edit';
    const shower = await Shower.findById(id);
    if (!shower) {
        req.flash('error', 'Cannot find that shower');
        return res.redirect('/showers');
    }
    res.render('shower/edit', { shower, features, translationMap, type });
};

// Edit a specific shower
module.exports.editShower = async (req, res) => {
    const { id } = req.params;
    const shower = await Shower.findByIdAndUpdate(id, { ...req.body.shower });
    if (!shower) {
        req.flash('error', 'Edit Failed');
        return res.redirect(`/showers/${id}`);
    }
    req.flash('success', 'Edit Successfully');
    res.redirect('/showers');
};

// Render the upload shower page
module.exports.renderUploadShower = (req, res) => {
    let type = 'upload';
    res.render('shower/upload', { features, translationMap, type });
};

// Upload 
module.exports.uploadShower = async (req, res, next) => {
    console.log(req.body.shower);
    const shower = new Shower(req.body.shower);
    shower.images = req.files.map(f => ({ url: applyTransformations(f.path, transformations), filename: f.filename }));
    console.log(shower);
    await shower.save();
    req.flash('success', 'Uploaded Successfully');
    res.redirect('/showers/upload');
};

// Delete a specific shower
module.exports.deleteShower = async (req, res) => {
    const { id } = req.params;
    const shower = await Shower.findByIdAndDelete(id);
    if (!shower) {
        req.flash('error', 'Cannot find that shower');
        return res.redirect('/showers');
    }
    req.flash('success', 'Deleted Successfully');
    res.redirect('/showers');
};
