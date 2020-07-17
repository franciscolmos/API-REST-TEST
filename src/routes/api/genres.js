var express = require('express');
var router = express.Router();
const genresController = require('../../controllers/genres')
/* localhost:3000/genres */
router.get('/', genresController.listAll);
router.post('/', genresController.create)
router.get('/:id', genresController.listOne);
router.delete('/:id', genresController.deleteOne);
router.put('/:id', genresController.updateOne);

module.exports = router;
