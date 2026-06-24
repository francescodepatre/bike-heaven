/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')
const updateBikesCart = require('./updateBikeCart')

async function getTotalBikes(id){
    try{
        const { rows } = await pool.query(
        'SELECT SUM(price) as price FROM bicycles JOIN bikesCart ON bicycles.id = bikesCart.codBicycle JOIN cart ON bikesCart.codCart = cart.id WHERE cart.id =  $1', [id]
        )

        console.log("Bike query: " + MYSQLQUERY)
        
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

        const update = await updateBikesCart(id)

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

module.exports = getTotalBikes