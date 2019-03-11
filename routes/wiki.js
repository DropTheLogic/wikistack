const express = require('express');
const router = express.Router();

const { Page, User } = require('../models');

const addPage = require('../views/addPage');
const wikipage = require('../views/wikipage');

router.get('/', (req, res, next) => {
  res.redirect('/');
});

router.post('/', async (req, res, next) => {
  try {
    const [ user, wasCreated ] = await User.findOrCreate({
      where: { name: req.body.author, email: req.body.email }
    });

    const { title, content } = req.body;
    let page = await Page.create({title, content});
    page.setAuthor(user);

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
    let user = await page.getAuthor();

    res.send(wikipage(page, user));
  } catch (error) { next(error); }
});

module.exports = router;
