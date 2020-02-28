const express = require('express');
const passport = require('passport');

const Authentication = require('../controllers/authentication');

/// we are setting session to false because JWTs don’t require sessions on the server.
const requireSignin = passport.authenticate('local', { session: false });

const router = express.Router();

router.get('/signup', (req, res) => {
    res.sendFile('signup.html');
})
/// We call the signup function when the user submits a request to the /signup post route
router.post('/signup', Authentication.signup);
router.get('/signin', (req, res) => {
    res.sendFile('signin.html');
})
/// We are first going to route the user through Passport, and if they pass, they will move on to the signin function, which will pass them a token
router.post('/signin', requireSignin, Authentication.signin);

module.exports = router;