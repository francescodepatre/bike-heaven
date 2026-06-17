/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')

async function serviceCart(idcustomer){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        console.log("Customer ID: ", idcustomer)
        const MYSQLQUERY = `
        SELECT *
        FROM cart
        INNER JOIN servicesCart ON cart.id = servicesCart.codCart
        INNER JOIN services ON servicesCart.codService = services.id
        WHERE cart.codCustomer = ${idcustomer}`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: true,
                data: null
            };
        }
        else{
            console.log(`${rows.length} risultati trovati`)
        }

        const JSONobjects = rows.map(row => ({
            id: row.id,
            name: row.name,
            brand: row.brand,
            price: row.price,
            feedback: row.feedback,
            description: row.description,
            quantity: row.quantity,
            category: row.codCategory,
            picture: row.picture.toString('base64')
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

module.exports = serviceCart