/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')
const maxId = require('./maxId')

async function signOperation(profile){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const firstName = profile.firstName;
        const lastName = profile.lastName;
        const birthDate = profile.birthDate;
        const email = profile.email;
        const phone = profile.phone;
        const address = profile.address;
        const username = profile.username;
        const password = profile.password;
        
        const MYSQLQUERY = `INSERT INTO customers (name,surname,birth,email,phone,address,username,password) VALUES("${firstName}","${lastName}",'${birthDate}',"${email}","${phone}","${address}","${username}","${password}")`;

        if(await connection.execute(MYSQLQUERY)){
            console.log("Query eseguita correttamente")
            const max = await maxId()
            let tot = max.maxId + 1
            return{
                success: true, 
                id: tot,
                username: username 

            }
        }
    }catch(err){
        console.log("errore")
        console.error(err);
        return{
            success: false
        }
    }
}

module.exports = signOperation;