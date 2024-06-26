const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL
console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connect to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB')
  })

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
})
peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('People', peopleSchema)