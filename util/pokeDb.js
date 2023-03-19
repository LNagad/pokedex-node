const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pokedexDb', 'root', '', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'    
});

module.exports = sequelize;