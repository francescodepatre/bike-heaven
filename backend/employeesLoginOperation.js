/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function employeesLoginOperation(usrn, psw) {
    try {
        const { rows } = await pool.query(
            `SELECT id, username, email, password FROM employees
             WHERE username = $1 OR email = $1`,
            [usrn]
        )
        if (rows.length === 0) return { success: false }
        const row = rows[0]
        if (row.password !== psw) return { success: false }
        return { success: true, username: row.username, id: row.id }
    } catch (err) {
        console.error('employeesLoginOperation error:', err)
        return { success: false }
    }
}

module.exports = employeesLoginOperation