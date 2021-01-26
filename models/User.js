const client = require('../app')
const { ObjectID } = require('mongodb')

const db = client.db('hospital')
const user = db.collection('user')

class User {
  static async findAll() {
    console.log('Find all users')
    try {
      const documents = await user.find().toArray()
      return documents
    } catch (error) {
      return error
    }
  }

  static async findById(id) {
    try {
      const document = await user.findOne({
        _id: ObjectID(id),
      })
      return document
    } catch (error) {
      return error
    }
  }

  static async create(input) {
    console.log('ADD USER', input)

    try {
      let document = await user.insertOne(input)

      console.log(document.ops[0])

      return document.ops[0]
    } catch (error) {
      return error
    }
  }

  static async update(id, input) {
    console.log('UPDATE USER', id, input)
    try {
      // let updates = {}

      // Object.keys(input).forEach((key) => {
      //   updates[key] = input[key]
      // })

      const updatedDocument = await user.findOneAndUpdate(
        {
          _id: ObjectID(id),
        },
        {
          $set: input,
        },
        {
          returnOriginal: false,
        }
      )

      return updatedDocument.value
    } catch (error) {
      return error
    }
  }

  static async delete(id) {
    try {
      const deleted = await user.findOneAndDelete({
        _id: ObjectID(id),
      })

      console.log(deleted.value)

      return deleted.value
    } catch (error) {
      return error
    }
  }

  static async deleteAll() {
    try {
      await user.deleteMany({})

      return 'Successfully deleted all users'
    } catch (error) {
      return error
    }
  }
}

module.exports = User
