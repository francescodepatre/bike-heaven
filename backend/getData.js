/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getData(id){
    try{
        const { rows } = await pool.query(
            'SELECT username, password FROM customers WHERE idcustomer = $1', [id]
        )

        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                username: null,
                password: null
            };
        }

        const row = rows[0]
        const username = row.username
        const password = row.password

        return {
            success: true,
            username: username,
            password: password
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getData