/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function deleteEmployee(id) {
    try {
        await pool.query('DELETE FROM employees WHERE id = $1', [id])
        return { success: true }
    } catch (err) {
        console.error('deleteEmployee error:', err)
        return { success: false }
    }
}

module.exports = deleteEmployee