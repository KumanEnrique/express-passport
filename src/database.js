const mongoose = require('mongoose')
const {mongodb} = require('./keys')

mongoose.connect(mongodb.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(res =>console.log('db is conected'))
    .catch(error => console.log(error))