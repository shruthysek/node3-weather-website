const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const publicDirectoryPath = path.join(__dirname, '../public')
const viwesPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
console.log(viwesPath)
app.set('view engine', 'hbs')
app.set('views', viwesPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        name: 'Shruthy Sekharan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shruthy Sekharan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Please use Ctrl + H',
        title: 'Help',
        name: 'Shruthy Sekharan'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address' })
    }
    // Based on address call geocode to get latitude, longitude and location
    geocode(req.query.address, (error, { lattitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error)
        }

        // Based on location call forecast to predict the forecast
        forecast(lattitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })



    /// Ends here///////////////////
    // res.send({
    //     forecast: "Cloudy",
    //     location: "Dublin",
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []

    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Shruthy Sekharan',
        errorMessage: 'Help Article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shruthy Sekharan',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log("Server started on port 3000")
})