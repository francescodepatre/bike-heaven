/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getTotalSales(){
    try{
        const currentDate = new Date();
        const currentMonthNumber = currentDate.getMonth() + 1;
        const currentMonthFormatted = currentMonthNumber.toString().padStart(2, '0');

        const { rows } = await pool.query(`SELECT SUM(sales.totalPrice) as total FROM sales WHERE MONTH(sales.saleDate) = ${currentMonthFormatted} AND sales.paymentState = "Payment successful"`)
        
        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                data: null
            };
        }

        const row = rows[0]
        const total = row.total

        return {
            success: true,
            data: total
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getTotalSales