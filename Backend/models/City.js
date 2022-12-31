const mongoose = require('mongoose')

const City = mongoose.model('City', {
    nombre: String,
    alcalde: String,
    habitantes: Number,
})

module.exports = City