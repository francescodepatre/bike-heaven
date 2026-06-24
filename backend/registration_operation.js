/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function signOperation(profile) {
    try {
        const { firstName, lastName, birthDate, email, phone, address, username, password } = profile
        const { rows } = await pool.query(
            `INSERT INTO customers (name, surname, birth, email, phone, address, username, password)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING idcustomer`,
            [firstName, lastName, birthDate, email, phone, address, username, password]
        )
        return { success: true, id: rows[0].idcustomer, username }
    } catch (err) {
        console.error('signOperation error:', err)
        return { success: false }
    }
}

module.exports = signOperation