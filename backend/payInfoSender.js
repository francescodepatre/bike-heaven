/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const nodemailer = require('nodemailer')

async function payInfo(customer, purchase){
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
            to: customer.email,
            subject: 'BIKEHEAVEN SHOP',
            html: `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Avvenuto Acquisto</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    }
                    .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                    text-align: center;
                    margin-bottom: 20px;
                    }
                    .message {
                    margin-bottom: 20px;
                    }
                    .thank-you {
                    font-weight: bold;
                    }
                    .details {
                    font-size: 16px;
                    }
                </style>
                </head>
                <body>
                <div class="container">
                    <div class="header">
                    <h1>Avvenuto Acquisto</h1>
                    </div>
                    <div class="message">
                    <p class="thank-you">Grazie per il tuo acquisto!</p>
                    <p class="details">Dettagli dell'ordine:</p>
                    <ul>
                        <li>Indirizzo di spedizione: ${customer.address}
                        <li>Totale: € ${purchase.price}</li>
                    </ul>
                    </div>
                    <div class="footer">
                    <p>Contattaci se hai domande o bisogno di assistenza.</p>
                    </div>
                </div>
                </body>
                </html>`
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

module.exports = payInfo