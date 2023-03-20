const express = require('express');
const homeController = require('../controllers/HomeController');
const router = express.Router();

router.get('/', homeController.GetHome);
router.post('/pokemon-filter', homeController.GetPokemonsFilter);


module.exports = router;