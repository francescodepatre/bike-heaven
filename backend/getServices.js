/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')
const updateServices = require('./updateServices')

async function searchCategName(id){
    try{
        const { rows } = await pool.query('SELECT SUM(price) as price FROM services JOIN servicesCart ON services.id = servicesCart.Codservice JOIN cart ON servicesCart.codCart = cart.id WHERE cart.id =  $1',[id])
        
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

        return {
            success: true,
            price: price
        }


    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = searchCategName