/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

const ALLOWED_CATEGORIES = new Set(['bicycles', 'accessories', 'services'])

async function searchCat(category) {
    try {
        if (!ALLOWED_CATEGORIES.has(category)) {
            console.error('Invalid category:', category)
            return { success: false, data: null }
        }
        // Table name is whitelisted above so safe to interpolate
        const { rows } = await pool.query(
            `SELECT id, name, brand, price, description, picture FROM ${category}`
        )
        if (rows.length === 0) return { success: false, data: null }
        const JSONobjects = rows.map(row => ({
            id: row.id, name: row.name, brand: row.brand, price: row.price,
            desc: row.description,
            picture: row.picture ? Buffer.from(row.picture).toString('base64') : null
        }))
        return { success: true, data: { oggetti: JSONobjects } }
    } catch (err) {
        console.error('searchCat error:', err)
        return { success: false, data: null }
    }
}

module.exports = searchCat