const { Client } = require('pg');

class Database {
    // constructor() {
    //     this.client = new Client({
    //         user: 'postgres',
    //         host: 'localhost',
    //         database: 'inhouseadmin',
    //         password: 'inhouse@admin',
    //         port: 5435,
    //     });
    //     this.connected = false;
    // }
    constructor() {
        this.client = new Client({
            user: "avnadmin",
            password: "AVNS_rKPrz8nv9v37jJnoKzO",
            host: "pg-12b350d7-yashgami04-7471.c.aivencloud.com",
            port: 18909,
            database: "inhouseadmin",
            ssl: {
                rejectUnauthorized: false,
                ca: `-----BEGIN CERTIFICATE-----
        MIIEQTCCAqmgAwIBAgIUJ2JWrPQbVcuLWnSh07vcnJEtrqkwDQYJKoZIhvcNAQEM
        BQAwOjE4MDYGA1UEAwwvMDE1M2RlOGItMjk5MS00OTg5LTgxYWQtZDAzZWQ2ZDRl
        NWJmIFByb2plY3QgQ0EwHhcNMjQwNTA2MDUyMDI5WhcNMzQwNTA0MDUyMDI5WjA6
        MTgwNgYDVQQDDC8wMTUzZGU4Yi0yOTkxLTQ5ODktODFhZC1kMDNlZDZkNGU1YmYg
        UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBALHqdFGG
        NzeYivDj6yTpzwM8nluDLQtubNg7Y0xxg9R+ZMZ/Na4XKCspwjz9rcaCm3XEGmZo
        XEudg6G1DsMtm+wYOGC3HevEPHTLqIkGSTWvxgappLGXx8XCM1CgNZN5vk8PBEbA
        ccR9/gFOLK7MMkELF0dS7WwpIN2Gk6HBzKCP/5mDhHj/P/VcZDF775l4BTPFEPZL
        kmxnhdJimaxRh9TJm0m9HV9JZsRoK85gnCLripqhtR2yE7lTBQ59K1njRsi3GTf+
        PoXgX1P/Ab+KPUUsMWArRUionqW9jZmjvxB6gEqzzP0xo3w1HHzhuIyQMsRw5qc0
        wf4CTRa88xfsm0lQc5Ag6fJXEcAS4OPAVdaWzLuUAh8zAX7e+LnFU0eIuY6qarpQ
        k5peUqwvLD11KW5U0+pwJTYNn9y5YRQUipzUnUrlqEPWjiADLaSqzP38o4+Oqi4T
        GGU+HTDFGhiN6++ZKuItTxGu/Ghcl8f9xtjpYFaOZTcpnVciauKw2sXQmQIDAQAB
        oz8wPTAdBgNVHQ4EFgQUjYJNFra25S7HryLH8FtnggmW/LkwDwYDVR0TBAgwBgEB
        /wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBABM1BhEx7Xs5s9BV
        2U4MYyqPqlbb81T6XoIhuo2bbQxqwkay6YYbhpJfcGbPBG0mxSRWK7YNOPxrN8x6
        ziwyDXN9ot+lHjEyABXz/k1HUngep7AQZKiF/mmdO/n56dW69Fp9QWoY/jFv5z4N
        xndKK3u7XllOLsYB1xm/gD1OSV715kcyYDvfXYdcOczvLz4PnbFmvWnt9U2Nc0rO
        1Adz1ce7hiCbRHr/LmuV1dKu16dMu1uojfwlkmZbSBi2Qw22Ftyu/1VdT/4Brqds
        2mXYHKcMfET3h6szPRh1fCbN1lMroCXLAaK4fnZX/htJVn558d/AvCI2goxUZ/7I
        nBZYc8SHKR/Tj0jSSId0J3RcbNsb32CfSGs9Jo7qNVVnRmA0UBlBptKrx/8aP76p
        Pmz4xVd8Mc2/vN5ZY27NVmCGD4trFAgDSBrXr4A8rjSsmNql7N9b6j6JQS3OHTjs
        eW96zkvm9NCS5GdIH3QkO3Ykyjw/C0ukNywuLqkgVYhjt+un9w==
        -----END CERTIFICATE-----`,
            },
        });
        this.connected = false;
    }

    async connectToDatabase() {
        try {
            if (!this.connected) {
                await this.client.connect();
                console.log('Connected to the database');
                this.connected = true;
            }
            return this.client;
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    async closeDatabaseConnection() {
        try {
            if (this.connected) {
                await this.client.end();
                console.log('Disconnected from the database');
                this.connected = false;
            }
        } catch (error) {
            console.error('Error closing the database connection:', error);
            throw error;
        }
    }
}

module.exports = Database;
