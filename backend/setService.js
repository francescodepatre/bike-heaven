/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')

async function setService(service){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const name = service.name
        const price = service.price
        const description = service.description
        const feedback = service.feedback
        const brand = service.brand
        const image = service.image
        const category = service.category


        const base64Data = image.split(',')[1];

        const imageBuffer = Buffer.from(base64Data, 'base64');
        
        const MYSQLQUERY = `INSERT INTO services (name, price, description, feedback, brand, picture, codCategory) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        if(await connection.execute(MYSQLQUERY, [name, price, description, feedback, brand, imageBuffer, category])){
            console.log("Query eseguita correttamente")
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

module.exports = setService
