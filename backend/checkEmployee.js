/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function checkEmployee(id) {
    try {
        const { rows } = await pool.query('SELECT id FROM employees WHERE id = $1', [id])
        return { success: rows.length > 0 }
    } catch (err) {
        console.error('checkEmployee error:', err)
        return { success: false }
    }
}

module.exports = checkEmployee