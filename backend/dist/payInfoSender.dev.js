"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var nodemailer = require('nodemailer');

function payInfo(customer, purchase) {
  var transporter, mailOptions;
  return regeneratorRuntime.async(function payInfo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          transporter = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
              user: "bikeheaven.business@hotmail.com",
              pass: "BikeHeaven01."
            }
          });
          mailOptions = {
            from: "bikeheaven.business@hotmail.com",
            to: customer.email,
            subject: 'BIKEHEAVEN SHOP',
            html: "\n            <!DOCTYPE html>\n                <html lang=\"en\">\n                <head>\n                <meta charset=\"UTF-8\">\n                <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n                <title>Avvenuto Acquisto</title>\n                <style>\n                    body {\n                    font-family: Arial, sans-serif;\n                    margin: 0;\n                    padding: 0;\n                    }\n                    .container {\n                    max-width: 600px;\n                    margin: 0 auto;\n                    padding: 20px;\n                    border: 1px solid #ccc;\n                    border-radius: 5px;\n                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n                    }\n                    .header {\n                    text-align: center;\n                    margin-bottom: 20px;\n                    }\n                    .message {\n                    margin-bottom: 20px;\n                    }\n                    .thank-you {\n                    font-weight: bold;\n                    }\n                    .details {\n                    font-size: 16px;\n                    }\n                </style>\n                </head>\n                <body>\n                <div class=\"container\">\n                    <div class=\"header\">\n                    <h1>Avvenuto Acquisto</h1>\n                    </div>\n                    <div class=\"message\">\n                    <p class=\"thank-you\">Grazie per il tuo acquisto!</p>\n                    <p class=\"details\">Dettagli dell'ordine:</p>\n                    <ul>\n                        <li>Indirizzo di spedizione: ".concat(customer.address, "\n                        <li>Totale: \u20AC ").concat(purchase.price, "</li>\n                    </ul>\n                    </div>\n                    <div class=\"footer\">\n                    <p>Contattaci se hai domande o bisogno di assistenza.</p>\n                    </div>\n                </div>\n                </body>\n                </html>")
          };
          _context.next = 5;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.error('Error sending email: ', error);
              return {
                success: false
              };
            } else {
              console.log("Email sent successfully: ", info.response);
              return {
                success: true
              };
            }
          }));

        case 5:
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

module.exports = payInfo;