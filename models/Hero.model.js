const {Schema, model} = require('mongoose');

const schema = new Schema({
  nickname: {type: String, required: true, unique: true},
  real_name: {type: String, required: true, unique: true},
  origin_description: {type: String, required: true},
  superpowers: {type: String},
  catch_phrase: {type: String},
  images: {type: [String]},
});

module.exports = model('Hero', schema);
