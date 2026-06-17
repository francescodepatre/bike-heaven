/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

const mysql = require('mysql2')

async function setFeedBack(idProduct, value){

    let oldFeedback
    let numFeedback
    let newFeedback
    let setFeedback
    try{
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
        })

        const getOldFeedback = `
        SELECT feedback, codCategory
        FROM bicycles
        WHERE id = ${idProduct}
        UNION
        SELECT feedback, codCategory
        FROM accessories
        WHERE id = ${idProduct}
        UNION
        SELECT feedback, codCategory
        FROM services
        WHERE id = ${idProduct}`

        const [rows1] = await connection.promise().query(getOldFeedback)
        
        if(rows1.length === 0){
            return{
                success: false
            }
        }
        
        const row1 = rows1[0]
        oldFeedback = row1.feedback
        const category = row1.codCategory

        

        const getNumFeedback = `
        SELECT COUNT(id) as "reviewNum"
        FROM reviews
        WHERE reviews.codProduct = ${idProduct}`

        const [rows2] = await connection.promise().query(getNumFeedback)

        if(rows2.length === 0){
            return{
                success: false
            }
        }

        const row2 = rows2[0]
        numF = row2.reviewNum
        const numFeedback = parseInt(numF);

        if (oldFeedback === 0) {
                newFeedback = value
        }
        else if(oldFeedback != 0){
            let oldSum = oldFeedback * numFeedback;
            value = parseFloat(value)
            newFeedback = (oldSum + value) / (numFeedback + 1);
            newFeedback = parseFloat(newFeedback.toFixed(2));
        }
        
        if(category === 1 || category === 2 || category === 3 || category === 4 || category === 5){
            setFeedback = `UPDATE bicycles SET bicycles.feedback = ${newFeedback} WHERE bicycles.id = ${idProduct}`
            if(await connection.execute(setFeedback)){
                return {
                    success: true
                }
            }
            await connection.end()
        }
        else if(category === 6){
            setFeedback = `UPDATE accessories SET accessories.feedback = ${newFeedback} WHERE accessories.id = ${idProduct}`
            if(await connection.execute(setFeedback)){
                return {
                    success: true
                }
            }
            await connection.end()
        }
        else{
            setFeedback = `UPDATE services SET services.feedback = ${newFeedback} WHERE services.id = ${idProduct}`
            if(await connection.execute(setFeedback)){
                return {
                    success: true
                }
            }
            await connection.end()
        }
        
    }catch(err){
        console.error("Error: ", err)
    }
}

module.exports = setFeedBack