const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { features } = require('../utils/showerConstants');


const createEnum = (values) => ({
  type: String,
  enum: values,
});

const ShowerSchema = new Schema({
  size: createEnum(features.size),
  type: createEnum(features.type),
  subType: createEnum(features.subType),
  color: createEnum(features.color),
  glass: createEnum(features.glass),
  images: [
    {
      url: String,
      filename: String,
    },
  ],
});

module.exports = mongoose.model('Shower', ShowerSchema);















