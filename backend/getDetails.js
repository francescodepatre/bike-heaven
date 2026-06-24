/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getDetails(id) {
    try {
        const { rows } = await pool.query(
            'SELECT name, surname, birth FROM customers WHERE idcustomer = $1', [id]
        )
        if (rows.length === 0) return { success: false }
        return { success: true, name: rows[0].name, surname: rows[0].surname, birth: rows[0].birth }
    } catch (err) {
        console.error('getDetails error:', err)
        return { success: false }
    }
}

module.exports = getDetails