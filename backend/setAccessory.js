/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')

async function setAccessory(accessory){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const name = accessory.name
        const price = accessory.price
        const description = accessory.description
        const feedback = accessory.feedback
        const brand = accessory.brand
        const quantity = accessory.quantity
        const image = accessory.image
        const category = accessory.category

        const base64Data = image.split(',')[1];

        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        const MYSQLQUERY = `INSERT INTO accessories (name, price, description, feedback, brand, quantity, picture, codCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        if (await connection.execute(MYSQLQUERY, [name, price, description, feedback, brand, quantity, imageBuffer, category])) {
            console.log("Query eseguita correttamente");
            return {
                success: true
            };
        }
        }catch(err){
            console.log("errore")
            console.error(err);
            return{
                success: false
            }
        }
}

module.exports = setAccessory