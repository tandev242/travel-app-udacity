import axios from 'axios'
import { checkForName } from './nameChecker'

// Check URL is valid with Regex https://stackoverflow.com/questions/30970068/js-regex-url-validation
function isUrlValid(input) {
    var res = input.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g)
    if (res == null)
        return false
    else
        return true
}

const standardizePolarity = (tag) => {
    if(tag === 'P+' || tag === 'P') {
        return 'POSITIVE'
    }else if (tag === 'N+' || tag === 'N') {
        return 'NEGATIVE'
    } else {
        return 'NONE'
    }
}

async function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    checkForName(formText)

    if (isUrlValid(formText)) {
        try {
            const res = await axios.post('http://localhost:8081/api/check', { url: formText })
            const { agreement, confidence, irony, model, subjectivity, score_tag } = res.data.data
            const evalObj = { agreement, confidence, irony, model, subjectivity }
            let dom = `<div>Polarity: ${standardizePolarity(score_tag)}</div>`

            for (const [key, value] of Object.entries(evalObj)) {
                dom += `<div>${key}: ${value}</div>`
            }
            document.getElementById('results').innerHTML = dom
        } catch (e) {
            alert('Can not evaluate this URL !')
        }
    } else {
        alert('Please enter a valid URL !')
    }
}

export { handleSubmit, isUrlValid, standardizePolarity }
