const express = require('express');
const RegionsController = require('../controllers/RegionsController');
const router = express.Router();

router.get('/regions', RegionsController.GetRegions);
router.get('/create-region', RegionsController.GetCreateRegion);
router.post('/create-region', RegionsController.PostCreateRegion);

router.get('/edit-region/:regionId', RegionsController.GetEditRegion);
router.post('/edit-region', RegionsController.PostEditRegion);

router.get('/delete-region/:regionId', RegionsController.GetDeleteRegion);
router.post('/delete-region', RegionsController.PostDeleteRegion);

module.exports = router;