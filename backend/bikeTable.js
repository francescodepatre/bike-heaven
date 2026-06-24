/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function bikeTable() {
    try {
        const { rows } = await pool.query(
            `SELECT id, name, price, quantity FROM bicycles`
        )
        if (rows.length === 0) return { success: true, data: null }
        const JSONobjects = rows.map(row => ({
            id: row.id,
            name: row.name,
            price: row.price,
            quantity: row.quantity
        }))
        return { success: true, data: { oggetti: JSONobjects } }
    } catch (err) {
        console.error('bikeTable error:', err)
        return { success: false, data: null }
    }
}

module.exports = bikeTable