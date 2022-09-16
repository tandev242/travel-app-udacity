import { addTravelPlan, deleteTravelPlan } from './api'

function fillTravelPlans(plans) {
    const results = document.getElementById('results')
    results.innerHTML=""

    // loop each plan and push it to the dom
    plans && plans.forEach(function (plan, index) {
        const city = plan.cityInfo.name
        const countryName = plan.cityInfo.countryName
        const image = plan.image.webformatURL
        const temp = plan.weather.temp
        const depart = plan.depart
        const geonameId = plan.cityInfo.geonameId
        
        let dom = `<div class='card'>
                    <img src="${image}" alt="No Image">
                    <div class='card__item'>
                        <div>
                            <h3>Destination</h3>
                            <label>${city}, ${countryName}</label>
                        </div>
                        <div>
                            <h3>Departing:</h3>
                            <label>${depart}</label>
                        </div>
                        <div>
                            <h3>Temp:</h3>
                            <label>${temp}</label>
                        </div>
                    </div>
                    <button id='btnDelete${index}'>X</button>
                </div>`
        
        results.insertAdjacentHTML('afterbegin', dom)  // insert into result and put it at first 

        // add event onClick to button to delete card
        document.getElementById(`btnDelete${index}`).addEventListener('click', async () => {
            const plans = await deleteTravelPlan(geonameId, depart)
            fillTravelPlans(plans)
        })
    })
}

async function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let city = document.getElementById('name').value
    let depart = document.getElementById('depart').value

    // check city and depart exists then call action to get travelPlans
    if (city || depart) {
        const plans = await addTravelPlan(city, depart)
        fillTravelPlans(plans)
    } else {
        alert('Input cannot be blank!')
    }
}

export { handleSubmit, fillTravelPlans }
