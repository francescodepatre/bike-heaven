/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

const mysql = require('mysql2')

async function setBike(bike){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const name = bike.name
        const price = bike.price
        const description = bike.description
        const feedback = bike.feedback
        const brand = bike.brand
        const frame = bike.frame
        const dimensions = bike.dimensions
        const gear = bike.gear
        const brakes = bike.brakes
        const suspensions = bike.suspensions
        const weight = bike.weight
        const quantity = bike.quantity
        const image = bike.image
        const category = bike.category

        const imageData = Buffer.from(image.split(',')[1], 'base64');
        
        const MYSQLQUERY = `INSERT INTO bicycles (name, price, description, feedback, brand, frame, dimensions, gear, brakes, suspensions, weight, quantity, picture, codCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        if(await connection.execute(MYSQLQUERY, [name, price, description, feedback, brand, frame, dimensions, gear, brakes, suspensions, weight, quantity, imageData, category])){
            console.log("Query eseguita correttamente");
            return{
                success: true
            }
        }
    }catch(err){
        console.log("errore")
        console.error(err);
        return{
            success: false
        }
    }
}

module.exports = setBike
