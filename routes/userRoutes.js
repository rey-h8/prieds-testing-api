var router = require('express').Router()

var Controller = require('../controllers/')

/* GET users listing. */
router.get('/', Controller.userFindAll)

router.get('/:id', Controller.userFindById)

router.post('/', Controller.userCreate)

router.put('/:id', Controller.userUpdate)

router.delete('/', Controller.userDeleteAll)
router.delete('/:id', Controller.userDelete)

module.exports = router
