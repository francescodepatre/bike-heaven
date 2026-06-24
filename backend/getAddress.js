/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getAddress(id) {
    try {
        const { rows } = await pool.query(
            'SELECT address, phone, email FROM customers WHERE idcustomer = $1', [id]
        )
        if (rows.length === 0) return { success: false, address: null, phone: null, email: null }
        return { success: true, email: rows[0].email, phone: rows[0].phone, address: rows[0].address }
    } catch (err) {
        console.error('getAddress error:', err)
        return { success: false }
    }
}

module.exports = getAddress