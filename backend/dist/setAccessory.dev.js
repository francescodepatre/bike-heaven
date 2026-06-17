"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var mysql = require('mysql2');

function setAccessory(accessory) {
  var connection, name, price, description, feedback, brand, quantity, image, category, base64Data, imageBuffer, MYSQLQUERY;
  return regeneratorRuntime.async(function setAccessory$(_context) {
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
          name = accessory.name;
          price = accessory.price;
          description = accessory.description;
          feedback = accessory.feedback;
          brand = accessory.brand;
          quantity = accessory.quantity;
          image = accessory.image;
          category = accessory.category;
          base64Data = image.split(',')[1];
          imageBuffer = Buffer.from(base64Data, 'base64');
          MYSQLQUERY = "INSERT INTO accessories (name, price, description, feedback, brand, quantity, picture, codCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
          _context.next = 15;
          return regeneratorRuntime.awrap(connection.execute(MYSQLQUERY, [name, price, description, feedback, brand, quantity, imageBuffer, category]));

        case 15:
          if (!_context.sent) {
            _context.next = 18;
            break;
          }

          console.log("Query eseguita correttamente");
          return _context.abrupt("return", {
            success: true
          });

        case 18:
          _context.next = 25;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.log("errore");
          console.error(_context.t0);
          return _context.abrupt("return", {
            success: false
          });

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
}

module.exports = setAccessory;