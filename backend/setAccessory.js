/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
//const mysql = require('mysql2')
const pool = require('./db')

async function setAccessory(accessory) {
    try {
        const imageBuffer = Buffer.from(accessory.image.split(',')[1], 'base64')
        await pool.query(
            `INSERT INTO accessories (name, price, description, feedback, brand, quantity, picture, codCategory)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
            [accessory.name, accessory.price, accessory.description, accessory.feedback,
             accessory.brand, accessory.quantity, imageBuffer, accessory.category]
        )
        return { success: true }
    } catch (err) {
        console.error('setAccessory error:', err)
        return { success: false }
    }
}

module.exports = setAccessory