/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function setReview(idCustomer, value, reviewContent,codProduct){
    try{
        await pool.query(`INSERT INTO reviews (codCustomer,value,reviewContent,codProduct) VALUES ($1,$2,$3,$4);`, [idCustomer, value, reviewContent,codProduct]);

        return{
            success: true
        }
    }catch(err){
        console.log("errore")
        console.error(err);
        return{
            success: false
        }
    }
}

module.exports = setReview
