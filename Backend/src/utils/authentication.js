
const { create } = require('hbs');
const Database = require('../models/DataBase')
async function login(username,password){
    const db = new Database();
    const connectedClient = await db.connectToDatabase();
    const result =  await connectedClient.query('SELECT * FROM superUsers WHERE name = $1 AND password = $2', [username, password]);
    return result.rows; 
}

async function signup(username,password,email){
    const db = new Database();
    const connectedClient = await db.connectToDatabase();
    const result =  await connectedClient.query('INSERT INTO superUsers (name, password, email) VALUES ($1, $2, $3) RETURNING id', [username, password, email]);
    return result.rows; 
}

module.exports = {login,signup}
// auth('testing','121212')