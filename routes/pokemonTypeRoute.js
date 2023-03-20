const express = require('express');
const PokTypeController = require('../controllers/PokemonTypesController');
const router = express.Router();

router.get('/pokemonTypes', PokTypeController.GetPokemonTypes);
router.get('/create-type', PokTypeController.GetCreateType);
router.post('/create-type', PokTypeController.PostCreateType);

router.get('/edit-type/:typeId', PokTypeController.GetEditType);
router.post('/edit-type', PokTypeController.PostEditType);

router.get('/delete-type/:typeId', PokTypeController.PostDeleteType);

module.exports = router;