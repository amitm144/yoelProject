const Joi = require('joi')
const { features } = require('../utils/showerConstants');


module.exports.showerSchema = Joi.object({
    size: Joi.string().valid(...features.size).required(),
    type: Joi.string().valid(...features.type).required(),
    subType: Joi.string().valid(...features.subType).required(),
    color: Joi.string().valid(...features.color).required(),
    glass: Joi.string().valid(...features.glass).required(),
    
  });