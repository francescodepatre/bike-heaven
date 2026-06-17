/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')

async function getTotalBikes(){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const MYSQLQUERY = `SELECT SUM(bicycles.price) as totalBikes, SUM(bicycles.quantity) as bikeNum FROM bicycles`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                bikeNum: null,
                bikeValue: null
            };
        }

        const row = rows[0]
        const bikeNum = row.bikeNum
        const bikeValue = row.totalBikes
        
        await connection.end()

        return {
            success: true,
            bikeNum: bikeNum,
            bikeValue: bikeValue
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getTotalBikes