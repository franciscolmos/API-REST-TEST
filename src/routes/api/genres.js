var express = require('express');
var router = express.Router();
const apiMethods = require('../../controllers/genres')

/* localhost:3000/genres */

router.get('/', apiMethods.listAll);
router.post('/', apiMethods.createOne)
router.get('/:id', apiMethods.listOne);
router.delete('/:id', apiMethods.deleteOne);
router.put('/:id',apiMethods.updateOne);

module.exports = router;
