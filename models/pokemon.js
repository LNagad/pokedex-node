const {DataTypes}  = require('sequelize');

const sequelize = require('../util/pokeDb');

const Pokemon = sequelize.define('Pokemons', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

module.exports = Pokemon;