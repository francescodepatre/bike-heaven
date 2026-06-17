/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')
const getBikes = require('./getBikes')
const getAccessories = require('./getAccessories')
const getServices = require('./getServices')
const category = require('./categoryName')
const bikeUpdater = require('./updateBikes')
const accessoriesUpdater = require('./updateAccessories')
const servicesUpdater = require('./updateServices')
const updateCart = require('./deleteCartContent')

async function getProduct(id, type){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        if(type === 'single'){
            
            const MYSQLQUERY = `SELECT price FROM accessories WHERE id = ${id} UNION SELECT price FROM bicycles WHERE id = ${id} UNION SELECT price FROM services WHERE id = ${id}`

            const [rows] = await connection.promise().query(MYSQLQUERY)

            if (rows.length === 0) {
                console.log("Error no result")
                return {
                    success: false,
                    price: null
                }
            }

            const row = rows[0]
            const price = row.price

            let total = price

            await connection.end()
            
            const cat = await category(id)

            if(cat.category === "Road Bicycles" || cat.category === "Mountain Bikes" || cat.category === "City Bikes" || cat.category === "E-bikes" || cat.category === "Bikes for Kids"){
                await bikeUpdater(id)
            }
            else if(cat.category === "Accessories"){
                await accessoriesUpdater(id)
            }
            else if(cat.category === "Services"){
                await servicesUpdater(id)
            }

            return {
                success: true,
                price: total

            }

        }
        else if(type === "cart"){
            
            const bikeTotal = await getBikes(id)
            console.log("Bikes" + bikeTotal.price)
            const accessoryTotal = await getAccessories(id)
            console.log("Accessories" + accessoryTotal.price)
            const serviceTotal = await getServices(id)
            console.log("Services" + serviceTotal.price)

            let total = 0

            if(bikeTotal && accessoryTotal && serviceTotal){
                total = parseInt(bikeTotal.price) + parseInt(accessoryTotal.price) + parseInt(serviceTotal.price);
                console.log("Total price: ", total)
            }

            if(total > 0){
                const updCart = await updateCart(id)
                return {
                    success: true,
                    price: total
    
                }
            }
            else{
                return {
                    success: false,
                    price: null
    
                }
            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getProduct