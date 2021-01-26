var router = require('express').Router()

var userRoutes = require('./userRoutes.js')
var queueRoutes = require('./queueRoutes.js')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use('/users', userRoutes)
router.use('/queues', queueRoutes)

module.exports = router
