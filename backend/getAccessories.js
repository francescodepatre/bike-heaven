/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')
const updateAccessoriesCart = require('./updateAccessoriesCart')

async function searchCategName(id){
    try{
        const { rows } = await pool.query(
        `SELECT SUM(price) as price 
        FROM accessories 
        JOIN accessoriesCart ON accessories.id = accessoriesCart.Codaccessory 
        JOIN cart ON accessoriesCart.codCart = cart.id 
        WHERE cart.id =  $1`,[id]
        )

        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                price: null
            };
        }

        const row = rows[0];
        let price = row.price
        
        if(price === null) {
            price = 0
        }
        
        const update = await updateAccessoriesCart(id)

        if(update && update.success) {
            return {
                success: true,
                price: price
            }
        }
        else{
            return {
                success: false,
                price: 0
            }
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = searchCategName