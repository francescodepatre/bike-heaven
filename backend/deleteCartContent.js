/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')

async function deleteCartContent(id) {
    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const MYSQLQUERY1 = `DELETE FROM bikesCart WHERE bikesCart.codCart = ${id}`
        const MYSQLQUERY2 = `DELETE FROM accessoriesCart WHERE accessoriesCart.codCart = ${id}`
        const MYSQLQUERY3 = `DELETE FROM servicesCart WHERE servicesCart.codCart = ${id}`

        await connection.promise().execute(MYSQLQUERY1);
        await connection.promise().execute(MYSQLQUERY2);
        await connection.promise().execute(MYSQLQUERY3);

        return {
            success: true
        };

    } catch (err) {
        console.error("Error: ", err);

        return {
            success: false,
            error: err.message
        };
    }
}

module.exports = deleteCartContent;
