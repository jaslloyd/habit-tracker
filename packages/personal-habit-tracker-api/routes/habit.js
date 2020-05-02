const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

/* GET habits. */
router.get('/', (req, res) => {
  const { type } = req.query;

  Habit
    .find({ $and: [ { type }, { owner: req.user._id } ] })
    .then(habits => {
      // console.log(habits)
      res.json(habits);
    })
    .catch(e => { throw err });
});

// Create a new Habit
router.post('/', (req, res) => {
  const {
    name,
    description,
    type,
    category,
    target,
    month,
    year,
  } = req.body;

  const newHabit = new Habit({
    name,
    description,
    type,
    category,
    target,
    completed: 0,
    month,
    year,
    lastUpdated: [],
    owner: req.user._id
  });

  Habit
    .findOne({ $and: [ { name }, { month } ] })
    .then(habit => {
      if(habit){
        res.status(409).json({
          success: false, msg: `Habit "${name}" already exists for month ${month}`
        })
      } else {
        Habit
        .create(newHabit)
        .then(message => {
          res.json({ success: true, msg: 'Added new Habit' })
        })
        .catch(err => {
          res.json({ success: false, msg: 'Failed to add new habit' });
          console.log(err);
        });
      }
    })
})


router.post('/challenge', (req, res) => {
  const {
    name,
    description,
    category,
    reward,
    target,
    year,
    endDate
  } = req.body;

  const newHabit = new Habit({
    name,
    description,
    type: 'Challenge',
    category,
    reward,
    target,
    completed: 0,
    year,
    endDate,
    lastUpdated: [],
    owner: req.user._id
  });

  console.log(newHabit)
  Habit
    .create(newHabit)
    .then(message => {
      res.json({ success: true, msg: 'Added new Habit' })
    })
    .catch(err => {
      res.status(500).json({ success: true, msg: 'Failed to add new Habit' })
      console.log(err);
    });

})

// GET specific habit
router.get('/:id', (req, res) => {
  const habitID = req.params.id;
  Habit
    .findById(habitID)
    .then(habit => {
      res.json(habit)
    })
    .catch(err => { throw err });
});


// Update a habit
router.put('/:id', (req, res) => {
  const habitID = req.params.id;
  const {
    name,
    description,
    type,
    category,
    target,
    completed,
    month,
    year,
    lastUpdated
  } = req.body;

  const editHabit = {
    name,
    description,
    type,
    category,
    target,
    completed,
    month,
    year,
    lastUpdated,
  };

  Habit.findByIdAndUpdate(habitID, {
    $set: editHabit,
  })
    .then(message => {
      res.json({ success: true, msg: 'Habit Updated' });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false, msg: 'Failed to update habit' });
    })
});

// Delete a habit
router.delete('/:id', (req, res) => {
  const habitID = req.params.id;
  Habit
    .findByIdAndRemove(habitID)
    .then(message => {
      res.json({ success: true, msg: 'Habit Deleted' });
    })
    .catch(err => {
      res.json({ success: false, msg: 'Failed to delete habit' });
      console.log(err);
    });
});


module.exports = router;
