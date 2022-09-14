var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const fetch = require('node-fetch')
const FormData = require('form-data')
dotenv.config()
const cors = require('cors')

const baseURL = process.env.BASE_URL
const apiKey = process.env.API_KEY

const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/api/check', async function (req, res) {
    const { url } = req.body

    const form = new FormData()
    form.append("key", apiKey)
    form.append("txt", url)
    form.append("lang", "en")

    try {
        const resp = await fetch(baseURL, {
        method: 'POST',
        body: form})
        const data = await resp.json()
        res.status(200).json({ data })
    } catch (error) {
        res.status(400).json({ error })
    }
})
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Evaluate news nlp listening on port 8081!')
})
