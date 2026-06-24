/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getReviews(id){
    try{

        const { rows } = await pool.query( `SELECT customers.name as "FirstName", customers.surname as "LastName", reviews.value as "Value", reviews.reviewContent as "Content", reviews.id as "Id" FROM reviews JOIN customers ON reviews.codCustomer = customers.idcustomer WHERE reviews.codProduct = $1`, [id])
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                data: null
            };
        }
        else{
            console.log(`${rows.length} risultati trovati`)
        }

        const JSONobjects = rows.map(row => ({
            id: row.Id,
            firstname: row.FirstName,
            lastname: row.LastName,
            value: row.Value,
            content: row.Content
        }))

        const jsonData = { oggetti: JSONobjects }
        

        return {
            success: true,
            data: jsonData
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getReviews