/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

const pool = require('./db')

async function updateData(id, username, password){
    try{
        
        await pool.query(`UPDATE customers SET username = "$2", password = "$3" WHERE idcustomer = $1`,[id, username, password])

        if(await connection.execute(MYSQLQUERY)){
            return{
                success: true
            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = updateData