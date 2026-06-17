"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var mysql = require('mysql2');

function setBike(bike) {
  var connection, name, price, description, feedback, brand, frame, dimensions, gear, brakes, suspensions, weight, quantity, image, category, imageData, MYSQLQUERY;
  return regeneratorRuntime.async(function setBike$(_context) {
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
          name = bike.name;
          price = bike.price;
          description = bike.description;
          feedback = bike.feedback;
          brand = bike.brand;
          frame = bike.frame;
          dimensions = bike.dimensions;
          gear = bike.gear;
          brakes = bike.brakes;
          suspensions = bike.suspensions;
          weight = bike.weight;
          quantity = bike.quantity;
          image = bike.image;
          category = bike.category;
          imageData = Buffer.from(image.split(',')[1], 'base64');
          MYSQLQUERY = "INSERT INTO bicycles (name, price, description, feedback, brand, frame, dimensions, gear, brakes, suspensions, weight, quantity, picture, codCategory) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
          _context.next = 20;
          return regeneratorRuntime.awrap(connection.execute(MYSQLQUERY, [name, price, description, feedback, brand, frame, dimensions, gear, brakes, suspensions, weight, quantity, imageData, category]));

        case 20:
          if (!_context.sent) {
            _context.next = 23;
            break;
          }

          console.log("Query eseguita correttamente");
          return _context.abrupt("return", {
            success: true
          });

        case 23:
          _context.next = 30;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](0);
          console.log("errore");
          console.error(_context.t0);
          return _context.abrupt("return", {
            success: false
          });

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 25]]);
}

module.exports = setBike;