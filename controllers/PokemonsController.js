/* eslint-disable no-unused-vars */
const Pokemons = require('../models/pokemon');
const Regions = require('../models/region');
const PokemonTypes = require('../models/pokemonType');

exports.GetPokemons = (req, res, next) => {
  Pokemons.findAll({ include: [{ model: Regions }, { model: PokemonTypes }] })
    .then((result) => {

      const pokemons = result.map(p => {
        const {id, name, imageUrl} = p.dataValues;
        const region = p.dataValues.Region.dataValues.name;
        const pokemonType = p.dataValues.PokemonType.dataValues.name;

        return {id, name, imageUrl, region, pokemonType};
      });
      res.status(200).render('pokemons/pokemon', {
        pageTitle: 'Pokemons',
        pokemons: pokemons,
        hasPokemons: pokemons.length > 0,
        pokemonsActive: true
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.PostFindPokemon = async (req, res, next) => {
  const pokeName = req.body.PokeName;

  try{
    const [pokemonList, regionList] = await Promise.all([
      Pokemons.findAll({ include: [{ model: Regions }, { model: PokemonTypes }], where: {name: pokeName} }),
      Regions.findAll()
    ], {include: [Pokemons, Regions] });
  
    const pokemons = pokemonList.map(p => {
      const {id, name, imageUrl} = p.dataValues;
      const region = p.dataValues.Region.dataValues.name;
      const pokemonType = p.dataValues.PokemonType.dataValues.name;
  
      return {id, name, imageUrl, region, pokemonType};
    });
       
    res.status(200).render('home', {
      pageTitle: 'Pokemons',
      pokemons: pokemons,
      regions: regionList.map(p => p.dataValues),
      hasPokemons: pokemons.length > 0
    });
  } catch(err) {
    console.log(err);
  }
  
};


exports.GetCreatePokemon = async  (req, res, next) => {
  try {
    const [regionList, pokemonTypeList] = await Promise.all([
      Regions.findAll(),
      PokemonTypes.findAll(),
    ], { include: [Regions, PokemonTypes] });
    
    res.status(200).render('pokemons/save-pokemon', {
      pageTitle: 'Create Pokemon',
      editMode: false,
      pokeType: pokemonTypeList.map((p) => p.dataValues),
      regions: regionList.map((r) => r.dataValues),
      pokemonsActive: true
    });
  } catch (err) {
    console.log(err);
  }
    
};

exports.PostCreatePokemon = (req, res, next) => {
  const pokemonName = req.body.Name;
  const imageUrl = req.body.ImageUrl;
  const pokemonType = req.body.PokemonType;
  const Region = req.body.Region;

  if (!pokemonName && !imageUrl && !pokemonType && !Region && !pokemonType) {
    return res.redirect('/pokemons');
  }

  Pokemons.create({
    name: pokemonName,
    imageUrl: imageUrl,
    regionId: Region,
    pokemonTypeId: pokemonType,
  })
    .then((result) => {
      res.status(302).redirect('/pokemons');
    })
    .then((err) => {
      console.log(err);
    });
};

exports.GetEditPokemon = async (req, res, next) => {
  const pokemonId = req.params.pokemonId;
  const edit = req.query.edit;

  if (edit !== 'true' || !edit) {
    return res.redirect('/pokemons');
  }

  try{
    const [regionList, pokeTypesList, pokemon] = await Promise.all([
      Regions.findAll(),
      PokemonTypes.findAll(),
      Pokemons.findOne({where: {id: pokemonId}})
    ], {include: [Regions, PokemonTypes, Pokemons]});

    res.status(200).render('pokemons/save-pokemon', {
      pageTitle: 'Edit Region',
      editMode: true,
      regions: regionList.map(p => p.dataValues),
      pokeType: pokeTypesList.map(p => p.dataValues),
      pokemon: pokemon.dataValues,
      pokemonsActive: true
    });
  } catch(err) {
    console.log(err);
  }

};

exports.PostEditPokemon = (req, res, next) => {
  const pokemonName = req.body.Name;
  const imageUrl = req.body.ImageUrl;
  const pokemonType = req.body.PokemonType;
  const Region = req.body.Region;
  const PokemonId = req.body.PokemonId;
  
  if (!pokemonName && imageUrl && pokemonType) {
    return res.redirect('/pokemons');
  }
  Pokemons.update({
    name: pokemonName,
    imageUrl: imageUrl,
    regionId: Region,
    pokemonTypeId: pokemonType,
  }, {where: {id: PokemonId}})
    .then((result) => {
      res.status(302).redirect('/pokemons');
    })
    .then((err) => {
      console.log(err);
    });
};

exports.GetDeletePokemon = (req, res, next) => {
  const pokemonId = req.params.pokemonId;

  Pokemons.findOne({where: {id: pokemonId}}).then(result => {
    res.status(200).render('pokemons/delete-pokemon', {
      pokemon: result.dataValues
    });
  }).catch(err => {
    console.log(err);
  });
};

exports.PostDeletePokemon = (req, res, next) => {
  const pokemonId = req.body.Id;

  Pokemons.destroy({ where: { id: pokemonId } })
    .then((result) => {
      res.status(302).redirect('/pokemons');
    })
    .then((err) => {
      console.log(err);
    });
};
