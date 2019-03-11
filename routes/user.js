const express = require('express');
const router = express.Router();

const { User, Page } = require('../models');

const userList = require('../views/userList');
const userPages = require('../views/userPages');

router.get('/', async (req, res, next) => {
    try {
        let users = await User.findAll();
        res.send(userList(users));
    } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
    try {
        let id = Number(req.params.id);
        const user = await User.findOne({ where: { id } });
        const pages = await Page.findAll({ where: { authorId: id } });

        res.send(userPages(user, pages));
    } catch (error) { next(error); }
});

module.exports = router;
