/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function deleteCartContent(id) {
    try {
        await pool.query('DELETE FROM bikesCart       WHERE codCart = $1', [id])
        await pool.query('DELETE FROM accessoriesCart WHERE codCart = $1', [id])
        await pool.query('DELETE FROM servicesCart    WHERE codCart = $1', [id])
        return { success: true }
    } catch (err) {
        console.error('deleteCartContent error:', err)
        return { success: false, error: err.message }
    }
}

module.exports = deleteCartContent