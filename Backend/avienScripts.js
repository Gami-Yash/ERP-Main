const Database = require('./src/models/DataBase');

async function formstable(){
    db = new Database();
    const connectedClient = await db.connectToDatabase();
    // const query = await connectedClient.query('CREATE TABLE formsTable (id SERIAL PRIMARY KEY,sr INTEGER,name VARCHAR,CONSTRAINT id_auto_increment_start CHECK (id >= 300));');
    // const query = await connectedClient.query('CREATE TABLE fieldsTable (id SERIAL PRIMARY KEY,name VARCHAR,sr INTEGER,parentid INTEGER CHECK (parentid > 0),CONSTRAINT id_auto_increment_start CHECK (id >= 5000));');
    // const query = await connectedClient.query(`SELECT SETVAL('formstable_id_seq', 300, true);`);
    // const query = await connectedClient.query(`ALTER TABLE formsTable ADD COLUMN created_by VARCHAR,ADD COLUMN modified_by VARCHAR, ADD COLUMN created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,ADD COLUMN modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`);
    // const query = await connectedClient.query(`ALTER TABLE fieldsTable ADD COLUMN created_by VARCHAR,ADD COLUMN modified_by VARCHAR, ADD COLUMN created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,ADD COLUMN modified_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;`);




    if(query){
        console.log('table created ');
    }else{
        console.log('table not created');
    }
}

// formstable()


async function listTable(){
    db = new Database();
    const connectedClient = await db.connectToDatabase();
    // const query = await connectedClient.query('ALTER TABLE formsTable ADD CONSTRAINT id_auto_increment_start CHECK (id >= 5000)');
    const query = await connectedClient.query('select * from autoExample;');
    console.log(query.rows);
}

listTable();


async function updateTables(){
    db = new Database();
    const connectedClient = await db.connectToDatabase();
    // const query = await connectedClient.query('ALTER TABLE formsTable ADD CONSTRAINT id_auto_increment_start CHECK (id >= 5000)');
    const query = await connectedClient.query("update formsTable set created_by ='yash',modified_by = 'yash' where created_by is null and modified_by is null;");
    console.log(query.rows);
    if(query){
        console.log('updated')
    }else{
        console.log('error');
    }
}

// updateTables();



