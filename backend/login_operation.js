/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

const mysql = require('mysql2/promise'); 

async function loginOperation(usrn, psw) {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        });

        let MYSQLQUERY = `SELECT idcustomer, username, email, password FROM customers WHERE customers.username="${usrn}"  OR customers.email="${usrn}"  ;`;

        const [rows] = await connection.query(MYSQLQUERY);

        if (rows.length === 0) {
            console.log("Username o email errata");
            return { success: false };
        }

        const row = rows[0];
        const email = row.email;
        const username = row.username;
        const password = row.password;
        const id = row.idcustomer

        if (password === psw) {
            console.log("Login effettuato correttamente");
            return { 
                success: true,
                username: username,
                id: id
            };
        } else {
            console.log("Password errata");
            return { success: false };
        }
    } catch (err) {
        console.error("Errore durante l'operazione di login:", err);
        return { success: false };
    }
}

module.exports = loginOperation;
