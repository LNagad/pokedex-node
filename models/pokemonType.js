const {DataTypes}  = require('sequelize');

const sequelize = require('../util/pokeDb');

const PokemonType = sequelize.define('PokemonTypes', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = PokemonType;