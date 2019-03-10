const express = require('express');
const morgan = require('morgan');
const html = require('html-template-tag');
const path = require('path');

const models = require('./models/index');

const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/user');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({extended: false}));

app.use('/wiki', wikiRoutes);
app.use('/users', userRoutes);

const layout = require('./views/layout');
app.get('/', (req, res) => {
   res.send(layout(''));
});

// 500 error handling
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(layout(
    html`
      <h3>Oh snap!</h3>
      <p>Something went wrong. Let's try that again.</p>
      <code>${err}</code>`
  ));
});

// 404 Handling
app.use((req, res) => {
  res.status(404).send(layout(
    html`
      <h3>404 Page Not Found</h3>
      <p>Looks like that page doesn't exist...</p>`
  ));
});

const startServer = async () => {
  // Ensure connection to db
  await models.db.authenticate()
    .then(() => console.log('Database authenticated'))
    .catch((err) => {
      console.log('Error authenticating database');
      console.error(err);
    });
  // Ensure database is syncd
  await models.db.sync({ force: true });

  const PORT = 4449;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

startServer();
