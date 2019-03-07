const express = require('express');
const morgan = require('morgan');
const { db } = require('./models');

const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/user');

const models = require('./models/index');

const app = express();

db.authenticate().
then(() => {
  console.log('connected to the database');
});

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));

app.use('/wiki', wikiRoutes);

const layout = require('./views/layout');
app.get('/', (req, res) => {
   res.send(layout(''));
});

const init = async () => {
  await models.db.sync({ force: true });

  const PORT = 4449;
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
