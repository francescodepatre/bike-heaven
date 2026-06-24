/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function homeRequest() {
    try {
        const { rows } = await pool.query('SELECT * FROM bicycles ORDER BY id DESC LIMIT 8')
        if (rows.length === 0) return { success: false, data: null }
        const JSONobjects = rows.map(row => ({
            id: row.id, name: row.name, price: row.price, desc: row.description,
            fedb: row.feedback, brand: row.brand, fram: row.frame,
            dimension: row.dimensions, gear: row.gear, brakes: row.brakes,
            suspensions: row.suspensions, weight: row.weight, quantity: row.quantity,
            picture: row.picture ? Buffer.from(row.picture).toString('base64') : null,
            category: row.codcategory
        }))
        return { success: true, data: { oggetti: JSONobjects } }
    } catch (err) {
        console.error('homeRequest error:', err)
        return { success: false, data: null }
    }
}

module.exports = homeRequest