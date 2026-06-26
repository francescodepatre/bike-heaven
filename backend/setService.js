/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function setService(service){
    try{

        const name = service.name
        const price = service.price
        const description = service.description
        const feedback = service.feedback
        const brand = service.brand
        const image = service.image
        const category = service.category

        if (!service.image || !service.image.includes(',')) {
            console.error('setService error: immagine mancante o formato non valido');
            return { success: false };
        }


        const base64Data = image.split(',')[1];

        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        await pool.query(`INSERT INTO services (name, price, description, feedback, brand, picture, codcategory) VALUES ($1, $2, $3, $4, $5, $6, $7)`,[name, parseFloat(price), description, parseInt(feedback,10) || 0, brand, imageBuffer, parseInt(category,10)]);

        return{
            success: true
        }
        
    }catch(err){
        console.log("errore")
        console.error(err);
        return{
            success: false
        }
    }
}

module.exports = setService
