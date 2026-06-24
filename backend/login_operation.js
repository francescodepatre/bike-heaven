/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function loginOperation(usrn, psw) {
    try {
        const { rows } = await pool.query(
            `SELECT idcustomer, username, email, password
             FROM customers
             WHERE username = $1 OR email = $1`,
            [usrn]
        )
        if (rows.length === 0) return { success: false }
        const row = rows[0]
        if (row.password !== psw) return { success: false }
        return { success: true, username: row.username, id: row.idcustomer }
    } catch (err) {
        console.error('loginOperation error:', err)
        return { success: false }
    }
}

module.exports = loginOperation