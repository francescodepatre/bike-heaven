/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
/*
const pool = require('./db')

async function setFeedBack(idProduct, value){

    let oldFeedback
    let numFeedback
    let newFeedback
    let setFeedback
    try{
        const { rows1 } = await pool.query("SELECT feedback, codCategory FROM bicycles WHERE id = $1 UNION SELECT feedback, codCategory FROM accessories WHERE id = $1 UNION SELECT feedback, codCategory FROM services WHERE id = $1",[idProduct])

        
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
*/
/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

const pool = require('./db');

async function setFeedBack(idProduct, value) {
    try {
        // 1. Trova prodotto (unificato tra tabelle)
        const [rows1] = await pool.execute(
            `
            SELECT feedback, codCategory
            FROM bicycles
            WHERE id = ?
            UNION
            SELECT feedback, codCategory
            FROM accessories
            WHERE id = ?
            UNION
            SELECT feedback, codCategory
            FROM services
            WHERE id = ?
            `,
            [idProduct, idProduct, idProduct]
        );

        if (rows1.length === 0) {
            return { success: false };
        }

        const { feedback: oldFeedback, codCategory: category } = rows1[0];

        // 2. Conta recensioni
        const [rows2] = await pool.execute(
            `SELECT COUNT(id) AS reviewNum FROM reviews WHERE codProduct = ?`,
            [idProduct]
        );

        const numFeedback = rows2[0].reviewNum;

        // 3. Calcolo nuovo feedback
        let newFeedback;

        const numericValue = parseFloat(value);

        if (!oldFeedback || oldFeedback === 0) {
            newFeedback = numericValue;
        } else {
            const oldSum = oldFeedback * numFeedback;
            newFeedback = (oldSum + numericValue) / (numFeedback + 1);
            newFeedback = parseFloat(newFeedback.toFixed(2));
        }

        // 4. Update tabella corretta
        let updateQuery;

        if (category >= 1 && category <= 5) {
            updateQuery = `UPDATE bicycles SET feedback = ? WHERE id = ?`;
        } else if (category === 6) {
            updateQuery = `UPDATE accessories SET feedback = ? WHERE id = ?`;
        } else {
            updateQuery = `UPDATE services SET feedback = ? WHERE id = ?`;
        }

        await pool.execute(updateQuery, [newFeedback, idProduct]);

        return { success: true };

    } catch (err) {
        console.error("Error:", err);
        return { success: false, error: err.message };
    }
}

module.exports = setFeedBack;