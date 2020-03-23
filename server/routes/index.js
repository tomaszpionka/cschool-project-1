const express = require('express');
const router = express.Router();

const config = require('../config');
const User = require('../controllers/user');
const Item = require('../controllers/item');

const authRouter = require('./authRouter');

router.use('/auth', authRouter);

router.get('/api/get/userprofilefromdb', (req, res) => {
  const email = req.query.email;
  User.getUserByMailController(email).then(q_res => res.json(q_res));
});

router.put('/api/put/updateduserdatatodb', (req, res) => {
  const data = [req.body.id, req.body.first_name, req.body.last_name];
  User.updateUserData(data)
  .then((q_err, q_res) => {
    res.json(q_res)
    console.log(q_err);
  });
});

router.post('/api/post/itemtodb', (req, res) => {
  const data = [req.body.title, req.body.price, req.body.imageUrl, req.body.description,req.body.userId];
  Item.addItemController(data)
  .then((q_err, q_res) => {
    res.json(q_res)
    console.log(q_err);
  });
});

router.get('/api/get/useritemsfromdb', (req, res) => {
  const id = req.query.id;
  Item.getItemsByUserController(id).then(q_res => console.log(res.json(q_res)));
});

module.exports = router;