/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')
const categoryFinder = require('./categoryName')

async function getProduct(id){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const categoryName = await categoryFinder(id)

        if(categoryName.category === "Road Bicycles" || categoryName.category === "Mountain Bikes" || categoryName.category === "City Bikes" || categoryName.category === "E-bikes" || categoryName.category === "Bikes for Kids"){
            
            const MYSQLQUERY = `SELECT * FROM bicycles WHERE bicycles.id = ${id}`

            const [rows] = await connection.promise().query(MYSQLQUERY)

            if (rows.length === 0) {
                console.log("Error no result")
                return {
                    success: false,
                    category: null,
                    data: null
                }
            }

            const row = rows[0]
            const name = row.name
            const price = row.price
            const description = row.description
            const feedback = row.feedback
            const brand = row.brand
            const frame = row.frame
            const dimensions = row.dimensions
            const gear = row.gear
            const brakes = row.brakes
            const suspensions = row.suspensions
            const weight = row.weight
            const quantity = row.quantity
            const picture = row.picture.toString('base64')

            const product = {
                name: name,
                price: price,
                description: description,
                feedback: feedback,
                brand: brand,
                frame: frame,
                dimensions: dimensions,
                gear: gear,
                brakes: brakes,
                suspensions: suspensions,
                weight: weight,
                quantity: quantity,
                picture: picture
            }

            await connection.end()

            return {
                success: true,
                category: categoryName.category,
                product: product

            }

        }
        else if(categoryName.category === "Accessories"){
            const MYSQLQUERY = `SELECT * FROM accessories WHERE accessories.id = ${id}`

            const [rows] = await connection.promise().query(MYSQLQUERY)

            if (rows.length === 0) {
                console.log("Error no result")
                return {
                    success: false,
                    category: null,
                    data: null
                }
            }

            const row = rows[0]
            const name = row.name
            const price = row.price
            const description = row.description
            const feedback = row.feedback
            const brand = row.brand
            const quantity = row.quantity
            const picture = row.picture.toString('base64')

            const product = {
                name: name,
                price: price,
                description: description,
                feedback: feedback,
                brand: brand,
                quantity: quantity,
                picture: picture
            }

            await connection.end()

            return {
                success: true,
                category: categoryName.category,
                product: product

            }
        }
        else if(categoryName.category === "Services"){
            const MYSQLQUERY = `SELECT * FROM services WHERE services.id = ${id}`

            const [rows] = await connection.promise().query(MYSQLQUERY)

            if (rows.length === 0) {
                console.log("Error no result")
                return {
                    success: false,
                    category: null,
                    data: null
                }
            }

            const row = rows[0]
            const name = row.name
            const price = row.price
            const description = row.description
            const feedback = row.feedback
            const brand = row.brand
            const picture = row.picture.toString('base64')

            const product = {
                name: name,
                price: price,
                description: description,
                feedback: feedback,
                brand: brand,
                picture: picture
            }

            await connection.end()

            return {
                success: true,
                category: categoryName.category,
                product: product

            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getProduct