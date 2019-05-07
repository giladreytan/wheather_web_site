const request = require('request')

const geocode = (address, callback) =>
{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2lsYWRyZXl0YW4iLCJhIjoiY2p1MnAzNG9qMDViZDN6bGVvYmZ4ejZreiJ9.4vwAZjzbjU0Jxbov9uujVw'
    request({url,json: true},(error,response) => {
        const {body} = response
        if (error)
        {
            callback ('Unable to connect to Geocode', undefined)
        } else if (body.features.length === 0)
        {
            callback ('Unable to find location:' + response.body.query, undefined)
        } else 
        {
            callback (undefined, {
                
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode