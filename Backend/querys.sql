CREATE TABLE superUsers (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    password VARCHAR,
    email VARCHAR
);



CREATE TABLE fieldsTable (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    sr INTEGER,
    parentid INTEGER CHECK (parentid > 0),
    CONSTRAINT id_auto_increment_start CHECK (id >= 5000)
);



CREATE TABLE formsTable (
    id SERIAL PRIMARY KEY,
    sr INTEGER,
    name VARCHAR,
    CONSTRAINT id_auto_increment_start CHECK (id >= 300)
);
