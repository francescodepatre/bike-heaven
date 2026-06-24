/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getCustomer(id) {
    try {
        const { rows } = await pool.query(
            'SELECT name, surname, email, address, phone FROM customers WHERE idcustomer = $1',
            [id]
        )
        if (rows.length === 0) return { success: false }
        const r = rows[0]
        return { success: true, name: r.name, surname: r.surname, email: r.email, phone: r.phone, address: r.address }
    } catch (err) {
        console.error('getCustomer error:', err)
        return { success: false }
    }
}

module.exports = getCustomer