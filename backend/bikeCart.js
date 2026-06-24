/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function bikeCart(idcustomer) {
    try {
        const { rows } = await pool.query(
            `SELECT b.*
             FROM cart c
             JOIN bikesCart bc ON c.id = bc.codCart
             JOIN bicycles b   ON bc.codBicycle = b.id
             WHERE c.codCustomer = $1`,
            [idcustomer]
        )
        if (rows.length === 0) return { success: true, data: null }
        const JSONobjects = rows.map(r => ({
            id: r.id, name: r.name, price: r.price, desc: r.description,
            fedb: r.feedback, brand: r.brand, fram: r.frame,
            dimension: r.dimensions, gear: r.gear, brakes: r.brakes,
            suspensions: r.suspensions, weight: r.weight, quantity: r.quantity,
            picture: r.picture ? Buffer.from(r.picture).toString('base64') : null,
            category: r.codcategory
        }))
        return { success: true, data: { oggetti: JSONobjects } }
    } catch (err) {
        console.error('bikeCart error:', err)
        return { success: false, data: null }
    }
}

module.exports = bikeCart