/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const mysql = require('mysql2')

async function searchFunction(searchName){
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        console.log("Searching ", searchName)
        const MYSQLQUERY = `
        SELECT bicycles.id, bicycles.name, bicycles.brand, bicycles.price, bicycles.description, bicycles.picture 
        FROM bicycles INNER JOIN categories ON bicycles.codCategory = categories.idcategory 
        WHERE bicycles.name LIKE '%${searchName}%' OR bicycles.brand LIKE '%${searchName}%' OR categories.name LIKE '%${searchName}%'
        UNION 
        SELECT accessories.id, accessories.name, accessories.brand, accessories.price, accessories.description, accessories.picture 
        FROM accessories INNER JOIN categories ON accessories.codCategory = categories.idcategory 
        WHERE accessories.name LIKE '%${searchName}%'OR accessories.brand LIKE '%${searchName}%' OR categories.name LIKE '%${searchName}%'
        UNION 
        SELECT services.id, services.name, services.brand, services.price, services.description, services.picture 
        FROM services INNER JOIN categories ON services.codCategory = categories.idcategory
        WHERE services.name LIKE '%${searchName}%' OR services.brand LIKE '%${searchName}%' OR categories.name LIKE '%${searchName}%'`

        const [rows] = await connection.promise().query(MYSQLQUERY)
        
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
            id: row.id,
            name: row.name,
            brand: row.brand,
            price: row.price,
            desc: row.description,
            picture: row.picture.toString('base64'),
        }))

        const jsonData = { oggetti: JSONobjects }
        
        await connection.end()

        return {
            success: true,
            data: jsonData
        }

        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = searchFunction