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

        const MYSQLQUERY = `SELECT SUM(accessories.price) as totalAcc, SUM(accessories.quantity) as accNum FROM accessories`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                accNum: null,
                accValue: null
            };
        }

        const row = rows[0]
        const accNum = row.accNum
        const accValue = row.totalAcc
        
        await connection.end()

        return {
            success: true,
            accNum: accNum,
            accValue: accValue
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getTotalAccessories