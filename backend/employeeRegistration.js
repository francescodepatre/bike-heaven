/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function signEmployee(employee) {
    try {
        const { firstName, lastName, birthDate, email, phone, address, username, password } = employee
        await pool.query(
            `INSERT INTO employees (firstname, lastname, email, phone, address, birth, username, password)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [firstName, lastName, email, phone, address, birthDate, username, password]
        )
        return { success: true }
    } catch (err) {
        console.error('signEmployee error:', err)
        return { success: false }
    }
}

module.exports = signEmployee