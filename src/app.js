const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// define path for express config
const dirPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(dirPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Aditya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Aditya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'Help page',
        title: 'Help',
        name: 'Aditya'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Error 404',
        name: 'Aditya',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Error 404',
        name: 'Aditya',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('server is ready on port ' + port)
})