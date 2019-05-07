const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/Utils/geocode.js')
const forecast = require('../src/Utils/forecast.js')

const app = express()

//setting up directories
const viewsPath = path.join(__dirname,'../templates/views')
const staticPath = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')


// setup hbs renderer + views folder
app.set('view engine','hbs') //seting express to work with hbs handler
app.set('views', viewsPath) //setting views hbs folder - holding web pages
hbs.registerPartials(partialsPath) // setting partials folder - holding templates for all web pages

//setup express static folders
app.use(express.static(staticPath))

app.get('', (req,res) => { 
    
    res.render('index',{ //app.get goes to hbs setup folder views
        title: 'Weather app',
        name: 'Gilad Reytan'
    })
})

app.get('/about', (req,res) => {

    res.render('about',{    //app.get goes to hbs setup folder views
        title: 'About',
        name: 'Gilad Reytan',
        about: 'testing...'
    })
})

app.get('/help', (req,res) => {

    res.render('help',{ //app.get goes to hbs setup folder views
        title: 'Help',
        name: 'Gilad Reytan',
        text: 'help file...'
    })
})

app.get('/weather', (req, res) => { //returning JSON, no html web page

    if (!req.query.address){
        return res.send({error:'Must send address'}) //no address
    }

    geocode(req.query.address, (error, {latitude, longtitude} = {}) => {

        if (error) {
            return res.send({error: error}) //communication with web

        }
        
        forecast(latitude, longtitude, (error2, {temp, location, percipation} = {}) => {
            if (error2) {
                return res.send({error: error2})           //no valid address     
            }
            
            res.send({
                title: 'Weather App',
                address: req.query.address,
                temp,
                location,
                percipation,
                
            })

        })
        
    })
    
})

app.get('/help/*', (req,res) => {

    res.render('404',{ //app.get goes to hbs setup folder views
        title: '404 page',
        name: 'Gilad Reytan',
        text:'help doc is missing'        
    })
})

app.get('*', (req,res) => {

    res.render('404',{ //app.get goes to hbs setup folder views
        title: '404 page',
        name: 'Gilad Reytan',
        text:''        
    })
})


app.listen(3000, ()=>{
    console.log('Server is up and running...')
})