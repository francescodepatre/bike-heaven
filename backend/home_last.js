/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

const mysql = require('mysql2')

async function homeRequest(){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const MYSQLQUERY = "SELECT * FROM bicycles ORDER BY id DESC LIMIT 8"

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                data: null
            };
        }
        else{
            console.log(`${rows.length} risultati trovati`)
        }

        const JSONobjects = rows.map(row => ({
            id: row.id,
            name: row.name,
            price: row.price,
            desc: row.description,
            fedb: row.feedback,
            brand: row.brand,
            fram: row.frame,
            dimension: row.dimensions,
            gear: row.gear,
            brakes: row.brakes,
            suspensions: row.suspensions,
            weight: row.weight,
            quantity: row.quantity,
            picture: row.picture.toString('base64'),
            category: row.codCategory
        }))

        const jsonData = { oggetti: JSONobjects }

        
        await connection.end()

        return {
            success: true,
            data: jsonData
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = homeRequest