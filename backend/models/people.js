const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URL
console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connect to MongoDB')
  })
  .catch(() => {
    console.log('error connecting to MongoDB')
  })

const peopleSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: function(v) {
      return /\d{2,3}-\d{5,}/.test(v)
    },
    message: props => `${props.value} is not a valid phone number`
  },
})
peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('People', peopleSchema)