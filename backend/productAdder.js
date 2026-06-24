/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

const BIKE_CATEGORIES = new Set(['Road Bicycles', 'Mountain Bikes', 'City Bikes', 'E-bikes', 'Bikes for Kids'])

async function addProduct(idcart, idproduct, category) {
    try {
        if (BIKE_CATEGORIES.has(category)) {
            await pool.query('INSERT INTO bikesCart (codCart, codBicycle) VALUES ($1, $2)', [idcart, idproduct])
        } else if (category === 'Accessories') {
            await pool.query('INSERT INTO accessoriesCart (codCart, codAccessory) VALUES ($1, $2)', [idcart, idproduct])
        } else if (category === 'Services') {
            await pool.query('INSERT INTO servicesCart (codCart, codService) VALUES ($1, $2)', [idcart, idproduct])
        } else {
            return { success: false }
        }
        return { success: true }
    } catch (err) {
        console.error('addProduct error:', err)
        return { success: false }
    }
}

module.exports = addProduct