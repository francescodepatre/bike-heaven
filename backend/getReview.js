/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getReview(id){
    try{
        const { rows } = await pool.query(
            'SELECT feedback FROM bicycles WHERE id = $1 UNION SELECT feedback FROM accessories WHERE id = $1 UNION SELECT feedback FROM services WHERE id = $1', [id]
        )
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                address: null,
                phone: null,
                email: null
            };
        }

        const row = rows[0]
        const email = row.email
        const phone = row.phone
        const address = row.address

        return {
            success: true,
            email: email,
            phone: phone,
            address: address
        }

    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getReview