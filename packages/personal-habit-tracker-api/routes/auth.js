const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/google', passport.authenticate('google', {
    scope: ['profile'],
}))

// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//     // Passport takes the code it gave you, you then reach out to google with that code in exchange for information
//     // res.json({'message': 'Congrats you just auth using Google'});
//     res.redirect('http://localhost:3001/')
// })

router.get('/google/redirect', (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info,
                user,
            })
        }

        loginAndGenerateAccessToken(req, res, user);
    })(req, res);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            console.log(err)
            return res.status(400).json({
                message: info.message,
            })
        }

        loginAndGenerateAccessToken(req, res, user);
    })(req, res);
})

loginAndGenerateAccessToken = (req, res, user) => {
    req.login(user, {session: false}, (err) => {
        if(err) res.send(err);

        const userObj = {
            _id: user._id,
            userID: user.userID,
            username: user.username
        }
        const token = jwt.sign(userObj, 'SECRET_SECRET');
        return res.json({user, token});
    });
}

router.get('/logout', (req, res) => {
    console.log('Logging out...');
    req.logout();
    res.send({message: 'Logging out...'});
})

module.exports = router;