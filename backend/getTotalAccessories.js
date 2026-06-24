/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getTotalAccessories(){
    try{
        const { rows } = await pool.query(`SELECT SUM(accessories.price) as totalAcc, SUM(accessories.quantity) as accNum FROM accessories`)

        
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