const User = require('../models/User')
const Queue = require('../models/Queue')

class Controller {
  static async userFindAll(req, res, next) {
    console.log('FIND ALL USERS')
    try {
      const documents = await User.findAll(req.query)
      res.status(200).json(documents)
    } catch (error) {
      next(error)
    }
  }

  static async userFindById(req, res, next) {
    try {
      const document = await User.findById(req.params.id)
      res.status(200).json(document)
    } catch (error) {
      next(error)
    }
  }

  static async userCreate(req, res, next) {
    console.log('ADD UUSER', req.body)

    try {
      const document = await User.create(req.body)
      res.status(201).json(document)
    } catch (error) {
      next(error)
    }
  }

  static async userUpdate(req, res, next) {
    console.log('UPDATE User', req.params.id, req.body)
    try {
      let updatedDocument = await User.update(req.params.id, req.body)

      res.status(200).json(updatedDocument)
    } catch (error) {
      next(error)
    }
  }

  static async userDelete(req, res, next) {
    console.log('DELETE User', req.params.id)

    try {
      const document = await User.delete(req.params.id)

      res.status(200).json(document)
    } catch (error) {
      next(error)
    }
  }

  static async userDeleteAll(req, res, next) {
    try {
      const document = await User.deleteAll()

      res.status(200).json(document)
    } catch (error) {
      next(error)
    }
  }

  static async queueFindAll(req, res, next) {
    try {
      const documents = await Queue.findAll()
      res.status(200).json(documents)
    } catch (error) {
      next(error)
    }
  }

  static async queueCreate(req, res, next) {
    try {
      const document = await Queue.create(req.body)
      res.status(201).json(document)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller
