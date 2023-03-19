const {DataTypes}  = require('sequelize');

const sequelize = require('../util/pokeDb');

const Region = sequelize.define('Regions', {
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

module.exports = Region;