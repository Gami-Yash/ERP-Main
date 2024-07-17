const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const router = express.Router();
const {login, signup} = require('../utils/authentication');
const Database = require('../models/database');





var text = "";
var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

for( var i=0; i < 16; i++ )
    text += charset.charAt(Math.floor(Math.random() * charset.length));

const random = text;
// Set up middleware to parse request bodies
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.static('public')); // Serve static files from 'public' directory
router.use(session({
    secret: random, // Change this to a secure random string
    resave: false,
    saveUninitialized: true
}));



router.get('/home',(req,res)=>{
    if(req.session.userId){
        res.render('basicHome')
    }else{
        res.redirect('/')
    }
})

router.get('/',(req,res)=>{
    res.render('login')
})

router.get('/login',(req,res)=>{
    res.render('login')
})


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const returnstatus = await login(username,password);
    if (returnstatus)
    {
        req.session.userId = returnstatus[0].id; 
        req.session.userName = returnstatus[0].name;
        res.redirect('/home'); 
    }
    else
    {
        res.render('/login');
    }
});

router.post('/modules',async (req,res)=>{
    const db = new Database();
    const connectedClient = await db.connectToDatabase();
    const data = await connectedClient.query('select module,submodule from formstable;');
    console.log(data.rows)
    res.json(data)
})


module.exports = router;