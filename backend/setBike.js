/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function setBike(bike) {
    try {
        if (!bike.image || !bike.image.includes(',')) {
            console.error('setBike error: Immagine mancante o formato non valido');
            return { success: false };
        }
        const imageData = Buffer.from(bike.image.split(',')[1], 'base64')
        await pool.query(
            `INSERT INTO bicycles
             (name, price, description, feedback, brand, frame, dimensions, gear, brakes, suspensions, weight, quantity, picture, codcategory)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
            [bike.name, bike.price, bike.description, bike.feedback, bike.brand,
             bike.frame, bike.dimensions, bike.gear, bike.brakes, bike.suspensions,
             bike.weight, bike.quantity, imageData, bike.category]
        )

        console.log('bikeData ricevuto:', {
            name: bike.name,
            price: bike.price,
            category: bike.category,
            imageLength: bike.image?.length
        });
        return { success: true }
    } catch (err) {
        console.error('setBike error:', err)
        return { success: false }
    }
}

module.exports = setBike