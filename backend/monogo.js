const { default: mongoose } = require('mongoose')
const mogoose = require('mongoose')

const peopleSchema = new mogoose.Schema({
  name: String,
  number: String,
})
const People = mogoose.model('People', peopleSchema)

const password = process.argv[2]
const url = `mongodb+srv://fanyuanhaotc:${password}@cluster0.sxx9qcu.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

if (process.argv.length === 3) {
  People.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new People({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('give password as argument: node mongo.js <password>')
  console.log('or: node mongo.js <password> <name> <number>')
  process.exit(1)
}
