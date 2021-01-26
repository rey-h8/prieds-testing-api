const client = require('../app')

const db = client.db('hospital')
const queue = db.collection('queue')

class Queue {
  static async findAll() {
    console.log('Find all queues')
    try {
      const documents = await queue.find().toArray()
      console.log(documents)
      return documents
    } catch (error) {
      return error
    }
  }

  static async create() {
    console.log('Create queue')
    try {
      let createdAt = new Date()

      await queue.insertOne({
        createdAt,
      })

      let today = new Date() //
      today.setHours(0, 0, 0, 0)

      let todayVisitorsCount = await queue
        .find({
          createdAt: { $gte: today },
        })
        .count()

      let prefix =
        todayVisitorsCount < 10 ? '00' : todayVisitorsCount < 100 ? '0' : ''

      let queueNumber = 'A' + prefix + todayVisitorsCount

      createdAt = createdAt.toLocaleString('en-US', { hour12: true })

      return {
        queueNumber,
        createdAt,
      }
    } catch (error) {
      return error
    }
  }
}

module.exports = Queue
