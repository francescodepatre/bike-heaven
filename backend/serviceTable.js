/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function serviceTable() {
    try {
        const { rows } = await pool.query(
            `SELECT s.id, s.name, s.price FROM services s`
        )
        if (rows.length === 0) return { success: true, data: null }
        const JSONobjects = rows.map(row => ({
            id: row.id,
            name: row.name,
            price: row.price
        }))
        return { success: true, data: { oggetti: JSONobjects } }
    } catch (err) {
        console.error('serviceTable error:', err)
        return { success: false, data: null }
    }
}

module.exports = serviceTable