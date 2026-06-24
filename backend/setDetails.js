/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

const pool = require('./db')

async function updateDetails(id, name, surname, birth){
    try{
        await pool.query(`UPDATE customers SET name = "$2", surname = "$3, birth = '$4' WHERE idcustomer = $1`,[id, name, surname, birth])

        
        return{
            success: true
        }

    }catch(err){
        console.error("Error: ", err)
        return{
            success: false
        }
    }
}

module.exports = updateDetails