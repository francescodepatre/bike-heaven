"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var mysql = require('mysql2');

function setService(service) {
  var connection, name, price, description, feedback, brand, image, category, base64Data, imageBuffer, MYSQLQUERY;
  return regeneratorRuntime.async(function setService$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'bikeheaven',
            port: '3307'
          });
          name = service.name;
          price = service.price;
          description = service.description;
          feedback = service.feedback;
          brand = service.brand;
          image = service.image;
          category = service.category;
          base64Data = image.split(',')[1];
          imageBuffer = Buffer.from(base64Data, 'base64');
          MYSQLQUERY = "INSERT INTO services (name, price, description, feedback, brand, picture, codCategory) VALUES (?, ?, ?, ?, ?, ?, ?)";
          _context.next = 14;
          return regeneratorRuntime.awrap(connection.execute(MYSQLQUERY, [name, price, description, feedback, brand, imageBuffer, category]));

        case 14:
          if (!_context.sent) {
            _context.next = 17;
            break;
          }

          console.log("Query eseguita correttamente");
          return _context.abrupt("return", {
            success: true
          });

        case 17:
          _context.next = 24;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.log("errore");
          console.error(_context.t0);
          return _context.abrupt("return", {
            success: false
          });

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}

module.exports = setService;