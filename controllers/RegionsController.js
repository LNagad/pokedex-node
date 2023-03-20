/* eslint-disable no-unused-vars */
const Regions = require('../models/region');

exports.GetRegions = (req, res, next) => {

  Regions.findAll().then(result => {
    const regions = result.map(p => p.dataValues);
    res.status(200).render('regions/region', {
      pageTitle: 'Regions',
      regions: regions,
      regionsActive: true
    });

  }).catch(err => {
    console.log(err);
  });
 
};

exports.GetCreateRegion = (req, res, next) => {
  res.status(200).render('regions/save-region', {
    pageTitle: 'Create Region',
    editMode: false,
    regionsActive: true
  });
};

exports.PostCreateRegion = (req, res, next) => {
  const regionName = req.body.Name;

  if (!regionName) {
    return res.redirect('/regions');
  }

  Regions.create({name: regionName}).then(result => {
    res.status(302).redirect('/regions');
  }).then(err => {
    console.log(err);
  }); 
};

exports.GetEditRegion = (req, res, next) => {
  const regionId = req.params.regionId;
  const edit = req.query.edit;

  if (edit !== 'true' || !edit) {
    return res.redirect('/regions');
  }

  Regions.findOne({where: {id: regionId}}).then(result => {
    const region = result.dataValues;

    res.status(200).render('regions/save-region', {
      pageTitle: 'Edit Region',
      editMode: true,
      region: region,
      regionsActive: true
    });

  }).catch(err => {
    console.log(err);
  });
 
};

exports.PostEditRegion = (req, res, next) => {
  const regionId = req.body.regionId;
  const regionName = req.body.Name;

  if (!regionName || !regionId) {
    return res.redirect('/regions');
  }

  Regions.update({name: regionName}, {where: {id: regionId}}).then(result => {
    res.status(302).redirect('/regions');
  }).then(err => {
    console.log(err);
  }); 
};

exports.PostDeleteRegion = (req, res, next) => {
  const regionId = req.params.regionId;

  Regions.destroy({where: {id: regionId}}).then(result => {
    res.status(302).redirect('/regions');
  }).then(err => {
    console.log(err);
  }); 
};