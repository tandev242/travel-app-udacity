var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const { getImage, getWeather, getCityInfo } = require('./controller')

let travelPlans = []

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

app.post('/api/delete', async function (req, res) {
    const { geonameId, depart } = req.body
    try {
        travelPlans = travelPlans.filter(plan => plan.cityInfo.geonameId != geonameId || plan.depart != depart)
        res.status(201).json({ travelPlans })
    } catch (error) {
        res.status(400).json({ error })
    }
})

app.post('/api/add', async function (req, res) {
    const { city, depart } = req.body
    try {
        const cityInfo = await getCityInfo(city)
        const image = await getImage(city)
        const { lat, lng } = cityInfo
        const weather = await getWeather(lat, lng)
        travelPlans.push({ cityInfo, image, weather, depart })
        res.status(201).json({ travelPlans })
    } catch (error) {
        res.status(400).json({ error })
    }
})
// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Travel app listening on port 8081!')
})
