"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var nodemailer = require('nodemailer');

function contactRequest(firstName, lastName, email, message) {
  var transporter, mailOptions;
  return regeneratorRuntime.async(function contactRequest$(_context) {
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
            to: 'bikeheaven.business@hotmail.com',
            subject: firstName + ' ' + lastName + ' ' + email,
            text: message
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

module.exports = contactRequest;