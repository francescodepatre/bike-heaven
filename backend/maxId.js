/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function maxId() {
    try {
        const { rows } = await pool.query('SELECT MAX(idcustomer) AS maxid FROM customers')
        return { success: true, maxId: rows[0].maxid || 0 }
    } catch (err) {
        console.error('maxId error:', err)
        return { success: false, maxId: 0 }
    }
}

module.exports = maxId