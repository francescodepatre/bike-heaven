/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function updateAddressInfo(id, address, email, phone) {
    try {
        await pool.query(
            'UPDATE customers SET address = $1, email = $2, phone = $3 WHERE idcustomer = $4',
            [address, email, phone, id]
        )
        return { success: true }
    } catch (err) {
        console.error('updateAddressInfo error:', err)
        return { success: false }
    }
}

module.exports = updateAddressInfo