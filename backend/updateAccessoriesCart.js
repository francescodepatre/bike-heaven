/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function updateAccessoriesCart(id){
    try{

        await pool.query(`UPDATE accessories JOIN accessoriesCart ON accessories.id = accessoriesCart.codAccessory JOIN cart ON accessoriesCart.codCart = cart.id SET quantity = quantity - 1 WHERE cart.id = $1`,[id])

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

module.exports = updateAccessoriesCart