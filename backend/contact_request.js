/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const nodemailer = require('nodemailer')

async function contactRequest(firstName, lastName, email, message) {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to:   process.env.EMAIL_USER,
            subject: `${firstName} ${lastName} <${email}>`,
            text: message
        })
        return { success: true }
    } catch (err) {
        console.error('contactRequest error:', err)
        return { success: false }
    }
}

module.exports = contactRequest