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
        if (!accessory.image || !accessory.image.includes(',')) {
            console.error('setAccessory error: immagine mancante o formato non valido');
            return { success: false };
        }
        const imageBuffer = Buffer.from(accessory.image.split(',')[1], 'base64')
        await pool.query(
            `INSERT INTO accessories (name, price, description, feedback, brand, quantity, picture, codcategory)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
            [accessory.name, parseFloat(accessory.price), accessory.description, parseInt(accessory.feedback, 10) || 0,
             accessory.brand, parseInt(accessory.quantity, 10), imageBuffer, parseInt(accessory.category, 10)]
        )
        return { success: true }
    } catch (err) {
        console.error('setAccessory error:', err)
        return { success: false }
    }
}

module.exports = setAccessory