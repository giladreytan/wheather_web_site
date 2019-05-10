const request = require('request')

const forecast = (latitude,longtitude, callback) =>
{
    const url = 'https://api.darksky.net/forecast/11bf345aa59b67ff26b733ae3496ccc3/' + latitude + ',' + longtitude + '?units=si'
    
    request({url,json: true},(error,response) => {
        const {body} = response
        if (error)
        {
            callback ('Unable to connect to wheather app', undefined)
        } else if (body.error)
        {
            callback ('Unable to find location: with positions: ' + latitude + ',' + longtitude , undefined)
        } else 
        {
            
            callback (undefined, {
                summary: body.daily.data[0].summary,
                temp: body.currently.temperature,
                location: body.timezone,
                percipation: body.currently.precipProbability,
                dayLow: body.daily.data.apparentTemperatureLow,
                dayHigh: body.daily.data.apparentTemperatureHigh
            })
        }
    })
}

module.exports = forecast