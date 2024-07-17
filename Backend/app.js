
const express = require('express');
const path = require('path');
const Database = require('./src/models/DataBase');


const port = process.env.PORT || 8080;


const app = express();


app.set('views', path.join(__dirname,'src/views'));
app.set('view engine', 'hbs');
app.use(express.static('public')); // Serve static files from 'public' directory
app.use('/',require(path.join(__dirname, '/src/routes/routes.js')))







app.listen(port,()=>{
    console.log('Server Started');
})
module.exports = app;