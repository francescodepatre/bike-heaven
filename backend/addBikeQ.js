/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function addBikeQ(id, quantity){
    try{
        await pool.query(
            `UPDATE bicycles 
            SET quantity = quantity + $1 
            WHERE id = $2`, 
            [quantity,id]
        )
        return { success: true }

    }catch(err){
        console.error('addBikeQ error:', err)
        return { success: false }
    }
}

module.exports = addBikeQ