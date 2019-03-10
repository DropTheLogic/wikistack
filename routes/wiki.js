const express = require('express');
const router = express.Router();

const { Page } = require('../models');

const addPage = require('../views/addPage');
const wikipage = require('../views/wikipage');

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/', async (req, res, next) => {
  const page = new Page({
    title: req.body.title,
    content: req.body.content
  });
  try {
    await page.save();
    res.status(300).redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error); }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  let { slug } = req.params;
  try {
    let page = await Page.findOne({ where: { slug } });
    res.send(wikipage(page));
  } catch (error) { next(error); }
});

module.exports = router;
