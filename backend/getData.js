/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')

async function getData(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const MYSQLQUERY = `SELECT username, password FROM customers WHERE idcustomer = ${id}`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                username: null,
                password: null
            };
        }

        const row = rows[0]
        const username = row.username
        const password = row.password
        
        await connection.end()

        return {
            success: true,
            username: username,
            password: password
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getData