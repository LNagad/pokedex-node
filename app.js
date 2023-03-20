/* eslint-disable no-unused-vars */
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const sequelize = require('./util/pokeDb');
const relations = require('./models/relations');


const ErrorController = require('./controllers/ErrorController');
const RegionsRoute = require('./routes/regionRoute');
const PokemonTypesRoute = require('./routes/pokemonTypeRoute');
const HomeRoute = require('./routes/homeRoute');
const PokemonsRoute = require('./routes/pokemonsRoute');

const CompareHelper = require('./util/Helpers/compareHelper');

const app = express();

app.engine(
  'hbs',
  engine({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main-layout',
    extname: 'hbs',
    helpers: {
      compareEqual: CompareHelper.compareEqual
    }
  })
);

app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(HomeRoute);
app.use(PokemonsRoute);
app.use(RegionsRoute);
app.use(PokemonTypesRoute);

app.use(ErrorController.Get404);

sequelize.sync().then((result) => {
  app.listen(3000);
}).catch((err) => {
  console.log(err);
});
