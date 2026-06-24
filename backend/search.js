/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function searchFunction(searchName) {
    try {
        const term = `%${searchName}%`
        const { rows } = await pool.query(
            `SELECT b.id, b.name, b.brand, b.price, b.description, b.picture
             FROM bicycles b JOIN categories c ON b.codCategory = c.idcategory
             WHERE b.name ILIKE $1 OR b.brand ILIKE $1 OR c.name ILIKE $1
             UNION
             SELECT a.id, a.name, a.brand, a.price, a.description, a.picture
             FROM accessories a JOIN categories c ON a.codCategory = c.idcategory
             WHERE a.name ILIKE $1 OR a.brand ILIKE $1 OR c.name ILIKE $1
             UNION
             SELECT s.id, s.name, s.brand, s.price, s.description, s.picture
             FROM services s JOIN categories c ON s.codCategory = c.idcategory
             WHERE s.name ILIKE $1 OR s.brand ILIKE $1 OR c.name ILIKE $1`,
            [term]
        )
        if (rows.length === 0) return { success: false, data: null }
        const JSONobjects = rows.map(row => ({
            id: row.id, name: row.name, brand: row.brand, price: row.price,
            desc: row.description,
            picture: row.picture ? Buffer.from(row.picture).toString('base64') : null
        }))
        return { success: true, data: { oggetti: JSONobjects } }
    } catch (err) {
        console.error('searchFunction error:', err)
        return { success: false, data: null }
    }
}

module.exports = searchFunction