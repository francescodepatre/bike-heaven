/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function refundOperation(id) {
    try {
        await pool.query(
            `UPDATE sales SET sales.paymentState = "Refunded" WHERE sales.id = $1`,
            [id]
        )
        return { success: true }
    } catch (err) {
        console.error('refundOperation error:', err)
        return { success: false }
    }
}

module.exports = refundOperation