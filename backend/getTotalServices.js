/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getTotalAccessories() {
    try {
        const { rows } = await pool.query(
            `SELECT SUM(services.price) as totalServices, COUNT(services.id) as serviceNum FROM services`
        )
        if (rows.length === 0) return { success: false }
        
        const row = rows[0]
        const serNum = row.serviceNum
        const serValue = row.totalServices

        return {
            success: true,
            serNum: serNum,
            serValue: serValue
        }
    } catch (err) {
        console.error('getTotalAccessories error:', err)
        return { success: false }
    }
}

module.exports = getTotalAccessories