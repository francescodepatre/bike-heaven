/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function cartCreator(userid) {
    try {
        await pool.query('INSERT INTO cart (codCustomer) VALUES ($1)', [userid])
        return { success: true }
    } catch (err) {
        console.error('cartCreator error:', err)
        return { success: false }
    }
}

module.exports = cartCreator