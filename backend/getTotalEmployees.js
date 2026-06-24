/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')

async function getTotalEmployees(){
    try{
        const { rows } = await pool.query(`SELECT COUNT(employees.id) as employees FROM employees`)

        if (rows.length === 0) {
            console.log("Non ci sono risultati...")
            return {
                success: false,
                emp: null
            };
        }

        const row = rows[0]
        const emp = row.employees
        

        return {
            success: true,
            emp: emp
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = getTotalEmployees