const request = require('request')

const forecast = (latitude, longitude, callback) => {
    url = `https://api.darksky.net/forecast/340b5d6850f2ffa7d87a58ff6590c8e7/${latitude},${longitude}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather forecast service!', undefined)
        } else if (body.error) {
            callback('Unable to find forecast! Try different search!')
        } else {
            const data = `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability} probability of rain.`
            callback(undefined, data)
        }
    })
}

module.exports = forecast