const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Setup user schema
const UserSchema = mongoose.Schema({
    userID: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String},
    
});

const User = mongoose.model('User', UserSchema);
//Exports our User model
module.exports = User;

module.exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10)
      .then(salt => {
        return bcrypt.hash(password, salt)
      })
      .then(hashedPassword => resolve(hashedPassword))
      .catch(err => reject(err));
  })
};

module.exports.comparePassword = (password, hashedPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword)
      .then(isMatch => resolve(isMatch))
      .catch(err => { throw err;});
  });
};
