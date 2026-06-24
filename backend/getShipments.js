/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getShipments() {
    try {
        const { rows } = await pool.query(
            `SELECT sh.id, sh.status, s.totalprice, cu.address, cu.name, cu.surname
             FROM shipments sh
             JOIN sales s     ON sh.codSale = s.id
             JOIN customers cu ON s.codCustomer = cu.idcustomer`
        )
        if (rows.length === 0) return { success: false, data: null }
        const JSONobjects = rows.map(r => ({
            id: r.id, state: r.status, price: r.totalprice,
            address: r.address, name: r.name, surname: r.surname
        }))
        return { success: true, data: { oggetti: JSONobjects } }
    } catch (err) {
        console.error('getShipments error:', err)
        return { success: false, data: null }
    }
}

module.exports = getShipments