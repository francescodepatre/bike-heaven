/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function serviceCart(idcustomer) {
    try {
        const { rows } = await pool.query(
            `SELECT s.*
             FROM cart c
             JOIN servicesCart sc ON c.id = sc.codCart
             JOIN services s      ON sc.codService = s.id
             WHERE c.codCustomer = $1`,
            [idcustomer]
        )
        if (rows.length === 0) return { success: true, data: null }
        const JSONobjects = rows.map(r => ({
            id: r.id, name: r.name, brand: r.brand, price: r.price,
            feedback: r.feedback, description: r.description, quantity: r.quantity,
            category: r.codcategory,
            picture: r.picture ? Buffer.from(r.picture).toString('base64') : null
        }))
        return { success: true, data: { oggetti: JSONobjects } }
    } catch (err) {
        console.error('serviceCart error:', err)
        return { success: false, data: null }
    }
}

module.exports = serviceCart