/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')

async function addProduct(idcart, idproduct, category){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })
        let MYSQLQUERY

        if(category === "Road Bicycles" || category === "Mountain Bikes" || category === "City Bikes" || category === "E-bikes" || category === "Bikes for Kids"){
            MYSQLQUERY = `INSERT INTO  bikesCart (codCart, codBicycle) VALUES(${idcart},${idproduct})`
        }
        else if(category === "Accessories"){
            MYSQLQUERY = `INSERT INTO  accessoriesCart (codCart, codAccessory) VALUES(${idcart},${idproduct})`
        }
        else if(category === "Services"){
            MYSQLQUERY = `INSERT INTO  servicesCart (codCart, codService) VALUES(${idcart},${idproduct})`
        }

        if( await connection.execute(MYSQLQUERY)){
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

module.exports = addProduct;