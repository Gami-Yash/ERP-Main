const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const Database = require('../models/DataBase')
const { login, signup } = require('../utils/authentication')
const router = express.Router();
const cors = require('cors');
const fs = require('fs');




var text = "";
var charset = "abcdefghijklmnopqrstuvwxyz0123456789";

for (var i = 0; i < 16; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));

const random = text;

router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));


router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());
router.use(express.static('public'));
router.use(session({
    secret: random,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
    }
}));










router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const returnstatus = await login(name, password);
        if (returnstatus) {
            req.session.userId = returnstatus[0].id;
            req.session.userName = returnstatus[0].name;
            req.session.isadmin = returnstatus[0].isadmin;
            res.status(200).json({
                success: true,
                message: 'Login successful',
                user: { id: returnstatus[0].id, name: returnstatus[0].name, isadmin: returnstatus[0].isadmin, }
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Incorrect username or password'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

router.get('/check-auth', (req, res) => {
    if (req.session.userId && req.session.isadmin) {
        res.json({ isAuthenticated: true, user: { id: req.session.userId, name: req.session.userName, isadmin: req.session.isadmin } });
    } else if (req.session.userId) {
        res.json({ isAuthenticated: true, user: { id: req.session.userId, name: req.session.userName, isadmin: false } });
    } else {
        res.json({ isAuthenticated: false });
    }
});

router.post('/signup', async (req, res) => {
    const username = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const returnstatus = await signup(username, password, email);
    if (returnstatus) {
        res.status(200).json({
            success: true,
            message: "User registered"
        })
    } else {
        res.status(500).json({ success: false, message: "Error while registering" });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        } else {
            res.status(200).json({ success: true, message: "Logged Out" })
        }
    });
});


router.post('/createTable', async (req, res) => {
    const sr = req.body.srNo;
    const name = req.body.name;
    const module = req.body.modules;
    const subModule = req.body.subModule;
    const db = new Database();
    try {
        const connectedClient = await db.connectToDatabase();
        const id = await connectedClient.query('SELECT nextval(\'formstable_id_seq\');');
        const ex = parseInt(id.rows[0].nextval);
        const nameOfTable = 'table' + ex;

        const result = await connectedClient.query('INSERT INTO formsTable(id,sr,name,created_by,modified_by,module,submodule) VALUES ($1,$2,$3,$4,$5,$6,$7)', [ex, sr, name, req.session.userName, req.session.userName, module, subModule]);
        const inserQuery = await connectedClient.query(`CREATE TABLE IF NOT EXISTS ${nameOfTable} (id SERIAL PRIMARY KEY);`);
        await db.closeDatabaseConnection();
        if (inserQuery) {
            res.json({ success: true, message: "Data table created succesfully" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/getModules', async (req, res) => {
    const module = req.query.module
    if (!module) {
        fs.readFile('module.json', 'utf-8', (err, data) => {
            if (err) {
                console.log('cant read')
                res.status(500).json({ sucess: false, messgae: "Cant open file" })
            }
            try {
                const jsonData = JSON.parse(data)
                res.json(jsonData)
            } catch (err) {
                res.status(500).json({ success: false, message: "Cant parse the data" })
            }
        })
    }else{
        console.log('into else',module);
        const db = new Database();
        try {
            const connectedClient = await db.connectToDatabase()
            const formName = await connectedClient.query(`SELECT name FROM formstable WHERE module='${module}'`);
            res.json(formName.rows);
            db.closeDatabaseConnection();
        } catch (error) {
            console.log('error',error);
        }
    }
})

router.get('/getFields', (req, res) => {
    fs.readFile('fields.json', 'utf-8', (err, fieldData) => {
        if (err) {
            console.log("error reading file", err);
            return res.status(500).json({ error: 'Error reading file' });
        }
        try {
            const parsedData = JSON.parse(fieldData);
            res.json(parsedData);
        } catch (error) {
            console.log('error parsing the data', error);
            res.status(500).json({ error: 'Error parsing file data' });
        }
    });
});

module.exports = router;



router.post('/createFields', async (req, res) => {
    const db = new Database();
    try {
        const {srNo,module,formName,fieldName,fieldType, required,editable } = req.body;
        const connectedClient = await db.connectToDatabase();

        const fieldsId = await connectedClient.query('SELECT nextval(\'fieldstable_id_seq\');');
        const finalfieldId = fieldsId.rows[0].nextval;
        const getFormsId = await connectedClient.query('SELECT id FROM formstable WHERE name = $1', [formName]);
        const finalFormsId = getFormsId.rows[0].id;
        const insertFieldTable = await connectedClient.query('INSERT INTO fieldstable(id,name,sr,parentid,created_by,modified_by,module,fieldname,fieldtype,required,editable) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [finalfieldId, formName, srNo, finalFormsId, req.session.userName, req.session.userName,module,fieldName,fieldType,required,editable]);
        const updateTable = await connectedClient.query(`ALTER TABLE ${'table' + finalFormsId} ADD ${'column' + finalfieldId} VARCHAR`);
        await db.closeDatabaseConnection();
    } catch (err) {
        console.log('Error:', err);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/createForms', async (req,res)=>{
    const formName = req.query.formName
    console.log(formName);
    const db = new Database();
    try {
        const connectedClient = await db.connectToDatabase();
        const formSchema = await connectedClient.query('SELECT fieldname, fieldtype, required, editable from fieldstable where name = $1',[formName])
        await db.closeDatabaseConnection();
        res.json(formSchema.rows);
    } catch (error) {
        console.log("error",error);    
    }
})







































module.exports = router;

