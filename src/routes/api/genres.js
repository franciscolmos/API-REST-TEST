var express = require('express');
var router = express.Router();
const genresController = require('../../controllers/genres')
/* GET home page. */
router.get('/', genresController.listAll);


module.exports = router;
