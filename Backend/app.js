//CRUD: Create, Read, Update, Delete
const express = require('express')
const mongoose = require ('mongoose')
const City = require('./models/City')
const cors = require('cors')

const app = express()

const DB_USER = 'test'
const DB_PASSWORD = 'test'

app.use(express.json())
app.use(cors({origin: 'http://localhost:4200'}))

app.get('/', (req, res) => { //"/" es ENDPOINT
    res.json({ message: 'Conexión realizada con éxito'})
})

//Create
app.post('/city', async (req, res) => {
    const {nombre, alcalde, habitantes} = req.body
    if (!nombre || !alcalde || !habitantes) {
        res.status(422).json({ error: 'Todos los campos son obligatorios'})
        return
    }
    const city = {
        nombre,
        alcalde,
        habitantes,
    }

    try {
        await City.create(city)
        res.status(201).json({ message: 'La ciudad ha sido creada'})

    } catch (error) {
        res.status(500).json({ error: error}) // la mejor alternativa es crear un log de errores
    }
})

//Read
app.get('/city', async (req, res) => {
    try {
        const cities = await City.find()
        res.status(200).json(cities)
    } catch (error) {
        res.status(500).json({ error: "Ingrese un link valido"})
    }
})

app.get('/city/:id', async (req, res) => {
    const id = req.params.id // extraer el "id" del dato
    try {
        const city = await City.findOne({_id: id})
        if(!city){
            res.status(422).json({ message: 'Ciudad no encontrada'})
            return
        }
        res.status(200).json(city)
    } catch (error) {
        res.status(500).json({ error: error})
    }
})

//Update
app.patch('/city/:id', async (req, res) => {
    const id = req.params.id
    const { nombre, alcalde, habitantes } = req.body
    const city = {
        nombre,
        alcalde,
        habitantes,
    } 
    try {
        const updateCity = await City.updateOne({_id: id}, city)
        //console.log(updateCity)

        if(updateCity.matchedCount === 0){ //validacion antes de actualizar
            res.status(422).json({ message: 'Ciudad no encontrada' })
            return
        }

        res.status(200).json(city)

    } catch (error) {
        res.status(500).json({ error: error})
    }
})

//Delete
app.delete('/city/:id', async (req, res) => {
    const id = req.params.id
    try {
        const city = await City.findOne({ _id: id })
        if(!city){ //validacion antes de remover
            res.status(422).json({ message: 'Ciudad no encontrada'})
            return
        }
        await City.deleteOne({ _id: id })
        res.status(200).json({ message: 'Ciudad removida' }) 
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.all('*', (req, res) => {
    res
        .status(404)
        .send('<h1>NO ENCONTRADO</h1>')      //Pagina por defecto cuando no se encuentra la direccion url
})

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@miapi.ofqfypp.mongodb.net/?retryWrites=true&w=majority`

    ).then(() => {
      console.log('Conectado al MONGODB')
      app.listen(5000)
    })
    .catch((err) => {
        console.log(err)
    })