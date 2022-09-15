import axios from 'axios'

const BASE_URL = 'http://localhost:8081/api'

const addTravelPlan = async (city, depart) => {
    try {
        let res = await axios.post(`${BASE_URL}/add`, { city, depart })
        return res.data.travelPlans
    } catch (e) {
        console.log(e)
    }
}

const deleteTravelPlan = async (geonameId, depart) => {
    try {
        let res = await axios.post(`${BASE_URL}/delete`, { geonameId, depart})
        return res.data.travelPlans
    } catch (e) {
        console.log(e)
    }
}

export { addTravelPlan, deleteTravelPlan }