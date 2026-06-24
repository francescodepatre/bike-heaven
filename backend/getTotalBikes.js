/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getTotalBikes(){
    try{
        const { rows } = await pool.query(`SELECT SUM(bicycles.price) as totalBikes, SUM(bicycles.quantity) as bikeNum FROM bicycles`)

        
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