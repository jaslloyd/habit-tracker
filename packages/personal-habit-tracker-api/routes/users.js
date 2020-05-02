const express = require('express');
const router = express.Router();
const User = require('../models/User');
const uuid = require('uuid').v4;

/* GET users listing. */
router.get('/', (req, res) => {
  const { filter } = req.query;

  User
    .find({})
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      console.log(err);
    });
});

/* Create new user. */
router.post('/', (req, res) => {
  const { 
    username,
    password
   } = req.body;

   User.hashPassword(password)
    .then(hashedPassword => {
      const newUser = new User({
        userID: uuid(),
        username,
        password: hashedPassword
      });

      User
      .create(newUser)
      .then(message => {
        res.json({ success: true, msg: 'Created new User' });
      })
      .catch(err => {
        res.json({ success: false, msg: 'Failed to create new user' });
        console.log(err);
      });
    })
    .catch(err => {
      res.json({ success: false, msg: 'Failed to create new user' });
      console.log(err);
    })
    



});

// GET specific user
router.get('/:id', (req, res) => {
  const userID = req.params.id;

  User
    .findById(userID)
    .then(user => {
      res.json(user)
    })
    .catch(err => { throw err });
});

// Update a user
router.put('/:id', (req, res) => {

});

// Delete a user
router.delete('/:id', (req, res) => {
  const userID = req.params.id;
  User.findByIdAndRemove(userID)
    .then(message => {
      res.json({ success: true, msg: 'User Deleted' });
    })
    .catch(err => {
      res.json({ success: false, msg: 'Failed to delete user' });
      console.log(err);
    })
});


module.exports = router;
