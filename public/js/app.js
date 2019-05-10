console.log('Client JS file is loaded')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Searching...'
    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        console.log('searching...')
        response.json().then((data) => {
                        
            if (data.error){
                console.log(data.error + 'data error')
                messageOne.textContent = data.error
            }
            else
            {
                messageOne.textContent = 'Today weather in ' + location + ' is ' + data.summary + ' current temp is ' + data.temp + ' degrees. there is a ' + data.percipation + '% chance of rain'
                console.log(data.location, data.temp, data.percipation)
            }
        })
    })
    
})