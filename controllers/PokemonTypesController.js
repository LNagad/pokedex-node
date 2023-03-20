/* eslint-disable no-unused-vars */
const PokType = require('../models/pokemonType');

exports.GetPokemonTypes = (req, res, next) => {

  PokType.findAll().then(result => {
    const types = result.map(p => p.dataValues);
    res.status(200).render('pokemonTypes/pokemonType', {
      pageTitle: 'Pokemon types',
      types: types,
      typesActive: true
    });

  }).catch(err => {
    console.log(err);
  });
 
};

exports.GetCreateType = (req, res, next) => {
  res.status(200).render('pokemonTypes/save-type', {
    pageTitle: 'Create pokemon type',
    editMode: false,
    typesActive: true
  });
};

exports.PostCreateType = (req, res, next) => {
  const typeName = req.body.Name;
  
  if (!typeName) {
    return res.redirect('/pokemonTypes');
  }

  PokType.create({name: typeName}).then(result => {
    res.status(302).redirect('/pokemonTypes');
  }).then(err => {
    console.log(err);
  }); 
};

exports.GetEditType = (req, res, next) => {
  const typeId = req.params.typeId;
  const edit = req.query.edit;

  if (edit !== 'true' || !edit) {
    return res.redirect('/pokemonTypes');
  }

  PokType.findOne({where: {id: typeId}}).then(result => {
    const type = result.dataValues;

    res.status(200).render('pokemonTypes/save-type', {
      pageTitle: 'Edit type',
      editMode: true,
      type: type,
      typesActive: true
    });

  }).catch(err => {
    console.log(err);
  });
 
};

exports.PostEditType  = (req, res, next) => {
  const typeId = req.body.typeId;
  const typeName = req.body.Name;

  if (!typeName || !typeId) {
    return res.redirect('/pokemonTypes');
  }

  PokType.update({name: typeName}, {where: {id: typeId}}).then(result => {
    res.status(302).redirect('/pokemonTypes');
  }).then(err => {
    console.log(err);
  }); 
};

exports.PostDeleteType = (req, res, next) => {
  const typeId = req.params.typeId;

  PokType.destroy({where: {id: typeId}}).then(result => {
    res.status(302).redirect('/pokemonTypes');
  }).then(err => {
    console.log(err);
  }); 
};