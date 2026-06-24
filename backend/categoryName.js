/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function searchCategName(id) {
    try {
        const { rows } = await pool.query(
            `SELECT c.name
             FROM bicycles b JOIN categories c ON b.codCategory = c.idcategory WHERE b.id = $1
             UNION
             SELECT c.name
             FROM accessories a JOIN categories c ON a.codCategory = c.idcategory WHERE a.id = $1
             UNION
             SELECT c.name
             FROM services s JOIN categories c ON s.codCategory = c.idcategory WHERE s.id = $1`,
            [id]
        )
        if (rows.length === 0) return { success: false, category: null }
        return { success: true, category: rows[0].name }
    } catch (err) {
        console.error('searchCategName error:', err)
        return { success: false, category: null }
    }
}

module.exports = searchCategName