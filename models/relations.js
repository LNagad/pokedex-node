
const Pokemons = require('./pokemon');
const PokemonTypes = require('./pokemonType');
const Regions = require('./region');

Pokemons.belongsTo(Regions, {
  constraints: false,
  foreignKey: 'regionId',
  onDelete: 'CASCADE',
});
  
Pokemons.belongsTo(PokemonTypes, {
  constraints: false,
  foreignKey: 'pokemonTypeId',
  onDelete: 'CASCADE',
});
  
Regions.hasMany(Pokemons, {constraints: false, foreignKey: 'regionId'});
PokemonTypes.hasMany(Pokemons, {constraints: false, foreignKey: 'pokemonTypeId'});

module.exports = { Pokemons, Regions, PokemonTypes };