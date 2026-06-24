/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getEmployees() {
    try {
        const { rows } = await pool.query('SELECT * FROM employees')
        if (rows.length === 0) return { success: false, data: null }
        const JSONobjects = rows.map(r => ({
            id: r.id, firstname: r.firstname, lastname: r.lastname,
            email: r.email, phone: r.phone, address: r.address,
            birth: r.birth, username: r.username, password: r.password
        }))
        return { success: true, data: { oggetti: JSONobjects } }
    } catch (err) {
        console.error('getEmployees error:', err)
        return { success: false, data: null }
    }
}

module.exports = getEmployees