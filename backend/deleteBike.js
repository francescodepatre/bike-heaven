/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function deleteBike(id){
    try{
        const id_bike = parseInt(id,10)
        const { rows } = await pool.query(
            `DELETE FROM bicycles WHERE id = $1`, [id_bike]
        )
        if (rows.length === 0) return { success: true, data: null }
        
    }catch(err){
        console.error('deleteAccessory error:', err)
        return { success: false, data: null }
    }
}

module.exports = deleteBike;
