/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function addAccessoryQ(id, quantity) {
    try {
        await pool.query(
            `UPDATE accessories
             SET quantity = quantity + $1
             WHERE id = $2`,
            [quantity, id]
        )
        return { success: true }
    } catch (err) {
        console.error('addAccessoryQ error:', err)
        return { success: false }
    }
}

module.exports = addAccessoryQ