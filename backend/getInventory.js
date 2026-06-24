/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getInventory() {
    try {
        const { rows } = await pool.query(
            `SELECT id, name, brand, price, quantity FROM bicycles
             UNION SELECT id, name, brand, price, quantity FROM accessories
             UNION SELECT id, name, brand, price, quantity FROM services`
        )
        if (rows.length === 0) return { success: false, data: null }
        const JSONobjects = rows.map(r => ({ id: r.id, name: r.name, brand: r.brand, price: r.price, quantity: r.quantity }))
        return { success: true, data: { oggetti: JSONobjects } }
    } catch (err) {
        console.error('getInventory error:', err)
        return { success: false, data: null }
    }
}

module.exports = getInventory