const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const emailValidators = require('../validators/emailValidators');
const usernameValidators = require('../validators/usernameValidators');
const passwordValidators = require('../validators/passwordValidators');

mongoose.Promise = global.Promise;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
  username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
  password: { type: String, required: true, validate: passwordValidators }
});

userSchema.pre('save', function(next) {
  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password, null, null, (err, hash) => {
    if(err) return next(err);
    this.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
