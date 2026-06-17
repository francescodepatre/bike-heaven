/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')

async function getTotalAccessories(){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const MYSQLQUERY = `SELECT SUM(services.price) as totalServices, COUNT(services.id) as serviceNum FROM services`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                serNum: null,
                serValue: null
            };
        }

        const row = rows[0]
        const serNum = row.serviceNum
        const serValue = row.totalServices
        
        await connection.end()

        return {
            success: true,
            serNum: serNum,
            serValue: serValue
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getTotalAccessories