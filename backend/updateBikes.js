/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function updateBikes(id){
    try{
        await pool.query(`UPDATE bicycles SET quantity = quantity - 1 WHERE id = $1`,[id])
        return{
            success: true
        }

    }catch(err){
        console.error("Error: ", err)
        return{
            success: false
        }
    }
}

module.exports = updateBikes