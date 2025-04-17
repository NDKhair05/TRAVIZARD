const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars');
const helpers = require('../helper.js')


const configViewEngine = function (app) {


    app.engine('.hbs', engine({
        extname: '.hbs',
        defaultLayout: 'main', // File layout mặc định
        layoutsDir: 'src/views/layouts', // Thư mục chứa layouts
        partialsDir: 'src/views/partials', // Thư mục chứa partials
        helpers: helpers
    }))
    app.set('views', path.join('./src', 'views'))
    app.set('view engine', 'hbs')

    //config static files: image/css/js
    app.use(express.static(path.join('src/', 'public')))
}

module.exports = configViewEngine