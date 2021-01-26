var router = require('express').Router()

var Controller = require('../controllers')

/* GET users listing. */
router.get('/', Controller.queueFindAll)

router.post('/', Controller.queueCreate)

module.exports = router
