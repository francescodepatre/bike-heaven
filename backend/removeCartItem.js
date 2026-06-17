/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')

async function removeCartItem(id, category, customer){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        let table = ""
        let target = ""
        let tableAttribute = ""

        if(category === 1){
            table = "bikesCart"
            target = "bicycles"
            tableAttribute = "codBicycle"
        }
        else if(category === 2){
            table = "accessoriesCart"
            target = "accessories"
            tableAttribute = "codAccessory"
        }
        else{
            table = "servicesCart"
            target = "services"
            tableAttribute = "codService"
        }
        
        const MYSQLQUERY = `
            DELETE FROM ${table}
            WHERE id IN (
                SELECT ${table}.id
                FROM ${table}
                INNER JOIN cart ON ${table}.codCart = cart.id
                INNER JOIN ${target} ON ${table}.${tableAttribute} = ${target}.id
                WHERE cart.codCustomer = ${customer} AND ${target}.id = ${id}
            );`;

        if(await connection.execute(MYSQLQUERY)){
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

module.exports = removeCartItem