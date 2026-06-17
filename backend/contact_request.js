/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const nodemailer = require('nodemailer')

async function contactRequest(firstName, lastName, email, message){
    try{
        const transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: "bikeheaven.business@hotmail.com",
                pass: "BikeHeaven01."
            }
        })

        const mailOptions = {
            from: "bikeheaven.business@hotmail.com",
            to: 'bikeheaven.business@hotmail.com',
            subject: firstName + ' ' + lastName + ' ' + email,
            text: message
        }

        await transporter.sendMail(mailOptions,(error, info) => {
            if (error) {
                console.error('Error sending email: ', error)
                return{
                    success: false
                }
            }
            else{
                console.log("Email sent successfully: ", info.response)
                return{
                    success: true
                }
            }
        })
    }catch(err){
        console.error("Error: ",err)
    }
}

module.exports = contactRequest