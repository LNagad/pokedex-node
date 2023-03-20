const express = require('express');
const PokemonsController = require('../controllers/PokemonsController');
const router = express.Router();

router.get('/pokemons', PokemonsController.GetPokemons);
router.get('/create-pokemon', PokemonsController.GetCreatePokemon);
router.post('/create-pokemon', PokemonsController.PostCreatePokemon);

router.get('/edit-pokemon/:pokemonId', PokemonsController.GetEditPokemon);
router.post('/edit-pokemon', PokemonsController.PostEditPokemon);

router.post('/find-pokemon', PokemonsController.PostFindPokemon);

router.get('/delete-pokemon/:pokemonId', PokemonsController.GetDeletePokemon);
router.post('/delete-pokemon', PokemonsController.PostDeletePokemon);

module.exports = router;