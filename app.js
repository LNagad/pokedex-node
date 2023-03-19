/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const sequelize = require('./util/pokeDb');

const relations = require('./models/relations');

const app = express();

app.engine(
  'hbs',
  engine({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout',
    extname: 'hbs',
  })
);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


sequelize.sync({ force: true }).then((result) => {
  app.listen(3000);
}).catch((err) => {
  console.log(err);
});
