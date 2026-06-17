/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2'); 

async function maxId() {
    try {
        const connection = mysql.createConnection({ 
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        });

        const MYSQLQUERY = `SELECT MAX(idcustomer) FROM customers;`; 

        const [rows] = await connection.promise().query(MYSQLQUERY);

        const maxCustomerId = rows[0]['MAX(idcustomer)'];

        console.log("Max: " + maxCustomerId)
        return { 
            success: true,
            maxId: maxCustomerId
        };
    } catch (err) {
        console.error("Errore durante l'operazione:", err);
        return { 
            success: false,
            maxId: maxCustomerId
        };
    }
}

module.exports = maxId;
