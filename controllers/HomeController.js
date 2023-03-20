/* eslint-disable no-unused-vars */
const Pokemons = require('../models/pokemon');
const Regions = require('../models/region');
const PokemonTypes = require('../models/pokemonType');

exports.GetHome = async (req, res, next) => {
  // Pokemons.findAll({ include: [{ model: Regions }, { model: PokemonTypes }] })
  //   .then((result) => {

  //     const pokemons = result.map(p => {
  //       const {id, name, imageUrl} = p.dataValues;
  //       const region = p.dataValues.Region.dataValues.name;
  //       const pokemonType = p.dataValues.PokemonType.dataValues.name;

  //       return {id, name, imageUrl, region, pokemonType};
  //     });
  //     res.status(200).render('home', {
  //       pageTitle: 'Home',
  //       homeActive: true,
  //       pokemons: pokemons
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  try {
    const [regionList, pokemonList] = await Promise.all(
      [
        Regions.findAll(),
        Pokemons.findAll({
          include: [{ model: Regions }, { model: PokemonTypes }],
        }),
      ],
      { include: [Regions, Pokemons] }
    );

    const pokemonsRefined = pokemonList.map((p) => {
      const { id, name, imageUrl } = p.dataValues;
      const region = p.dataValues.Region.dataValues.name;
      const pokemonType = p.dataValues.PokemonType.dataValues.name;
      return { id, name, imageUrl, region, pokemonType };
    });

    res.status(200).render('home', {
      pageTitle: 'Home',
      homeActive: true,
      pokemons: pokemonsRefined,
      regions: regionList.map((p) => p.dataValues),
      hasPokemons: pokemonsRefined.length > 0
    });
  } catch (err) {
    console.log(err);
  }
};

exports.GetPokemonsFilter = async (req, res, next) => {
  const FilterId = req.body.FilterId;

  try {
    const [regionList, pokemonList] = await Promise.all([ 
      Regions.findAll(),
      Pokemons.findAll({include: [{ model: Regions }, { model: PokemonTypes }],
        where: { regionId: FilterId } }

      )],{ include: [Regions, Pokemons] }
    );

    const pokemonsRefined = pokemonList.map((p) => {
      const { id, name, imageUrl } = p.dataValues;
      const region = p.dataValues.Region.dataValues.name;
      const pokemonType = p.dataValues.PokemonType.dataValues.name;
      return { id, name, imageUrl, region, pokemonType };
    });

    res.status(200).render('home', {
      pageTitle: 'Home',
      homeActive: true,
      pokemons: pokemonsRefined,
      regions: regionList.map((p) => p.dataValues),
      hasPokemons: pokemonsRefined.length > 0
    });
  } catch (err) {
    console.log(err);
  }
};
