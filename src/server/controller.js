const fetch = require('node-fetch')

// get Image from  PIXABAY through city
const getImage = async (city) => {
    const url = `${process.env.PIXABAY_URL}/?key=${process.env.PIXABAY_API_KEY}&q=${city}`;
    try {
        const res = await fetch(url, {
            method: 'GET'
        })
        const data = await res.json()
        // get the first record
        return data.hits[0]
    } catch (e) {
        throw new Error(e)
    }
}

// get weather from  WEATHERBIT through latitude and longitude
const getWeather = async (lat, lon) => {
    const url = `${process.env.WEATHERBIT_URL}?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&include=daily`;

    try {
        const res = await fetch(url, {
            method: 'GET'
        })
        const data = await res.json()
        // get the first record
        return data.data[0]
    } catch (e) {
        throw new Error(e)
    }
}

// get city information from  GEO through city
const getCityInfo = async (city) => {
    const url = `${process.env.GEONAMES_URL}?q=${city}&maxRows=1&username=${process.env.GEONAMES_USERNAME}`;
    try {
        const res = await fetch(url, {
            method: 'GET'
        })
        const data = await res.json()
        // get the first record 
        return data.geonames[0]
    } catch (e) {
        throw new Error(e)
    }
}

module.exports = { getImage, getWeather, getCityInfo }