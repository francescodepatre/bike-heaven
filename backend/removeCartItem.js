/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function removeCartItem(id, category, customer) {
    try {
        let query
        if (category === 1) {
            query = `DELETE FROM bikesCart
                     WHERE id IN (
                         SELECT bc.id FROM bikesCart bc
                         JOIN cart c ON bc.codCart = c.id
                         WHERE c.codCustomer = $1 AND bc.codBicycle = $2
                         LIMIT 1
                     )`
        } else if (category === 2) {
            query = `DELETE FROM accessoriesCart
                     WHERE id IN (
                         SELECT ac.id FROM accessoriesCart ac
                         JOIN cart c ON ac.codCart = c.id
                         WHERE c.codCustomer = $1 AND ac.codAccessory = $2
                         LIMIT 1
                     )`
        } else {
            query = `DELETE FROM servicesCart
                     WHERE id IN (
                         SELECT sc.id FROM servicesCart sc
                         JOIN cart c ON sc.codCart = c.id
                         WHERE c.codCustomer = $1 AND sc.codService = $2
                         LIMIT 1
                     )`
        }
        await pool.query(query, [customer, id])
        return { success: true }
    } catch (err) {
        console.error('removeCartItem error:', err)
        return { success: false }
    }
}

module.exports = removeCartItem