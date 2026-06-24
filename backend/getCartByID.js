/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

const pool = require('./db')

async function getCart(id) {
    try {
        const { rows } = await pool.query('SELECT id FROM cart WHERE codCustomer = $1', [id])
        if (rows.length === 0) return { success: false, idcart: null }
        return { success: true, idcart: rows[0].id }
    } catch (err) {
        console.error('getCart error:', err)
        return { success: false, idcart: null }
    }
}

module.exports = getCart