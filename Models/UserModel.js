const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId },
  name: { type: String, required: true, minLength: 5, maxLength: 1024 },
  email: { type: String, required: true, minLength: 5, maxLength: 255, unique: true },
  age: { type: Number, required: true },
})

validateUser = (user) => {
  const schema = {
    name: Joi.string().min(5).max(1024).required(),
    email: Joi.string().min(5).max(255).required().email(),
    age: Joi.number().integer().required(),
  }
  return Joi.validate(user, schema);
}

const User = mongoose.model("User", userSchema);
exports.validate = validateUser;
exports.User = User; 
