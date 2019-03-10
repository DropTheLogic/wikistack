const express = require('express');
const router = express.Router();

const userList = require('../views/userList');

router.get('/', (req, res, next) => {
    res.send(userList([]));
    next();
});

module.exports = router;
