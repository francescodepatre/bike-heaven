/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function deleteAccessory(id){
    try{
        const { rows } = await pool.query(
            `DELETE FROM accessories WHERE accessories.id = $1`, [id]
        )
        if (rows.length === 0) return { success: true, data: null }
        
    }catch(err){
        console.error('deleteAccessory error:', err)
        return { success: false, data: null }
    }
}

module.exports = deleteAccessory;
