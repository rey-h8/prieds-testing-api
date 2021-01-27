const { MongoClient } = require('mongodb')

var createError = require('http-errors')
var express = require('express')
var cors = require('cors')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var app = express()

const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

async function run() {
  try {
    await client.connect()

    await client.db('hospital').command({ ping: 1 })
    console.log('Connected successfully to MongoDB server')

    module.exports = client

    //
    // ─── SERVER ──────────────────────────────────────────────────────
    //

    var routes = require('./routes')

    // view engine setup
    app.set('views', path.join(__dirname, 'views'))
    app.set('view engine', 'jade')

    app.use(logger('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    // const http = require('http')

    const hostname = '127.0.0.1'
    const port = 3000

    // const server = http.createServer((req, res) => {
    //   res.statusCode = 200
    //   res.setHeader('Content-Type', 'text/plain')
    //   res.end('Hello World');
    // })

    // server.listen(port, hostname, () => {
    //   console.log(`Server running at http://${hostname}:${port}/`)
    // })

    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, 'public')))

    app.use(cors())
    app.use(routes)

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404))
    })

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}

      // render the error page
      res.status(err.status || 500)
      res.render('error')
    })

    app.listen(port, () =>
      console.log(`Server running at http://${hostname}:${port}/`)
    )
  } finally {
    // await client.close()
  }
}
run().catch((err) => {
  console.log(err)
  process.exit(1)
})
