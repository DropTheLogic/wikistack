const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage')
const layout = require('../views/layout');
const { Page } = require("../models");

router.get('/', (req, res, next) => {
  res.redirect('/')
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
  res.send(addPage())
});

module.exports = router;
