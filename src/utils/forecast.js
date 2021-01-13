const request = require('request')
const forecast = (lattitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=457596338950c55d07b3071daf110e07&query=' + lattitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        }
        else if (body.error) {
            callback('Unable to find location')
        }
        else {
            const data = body.current
            callback(undefined, `The temperature is ${data.temperature} and there is ${data.precip} of precipitation`)
        }
    })
}

module.exports = forecast