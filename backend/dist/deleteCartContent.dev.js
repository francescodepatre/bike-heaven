"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var mysql = require('mysql2');

function deleteCartContent(id) {
  var connection, MYSQLQUERY1, MYSQLQUERY2, MYSQLQUERY3;
  return regeneratorRuntime.async(function deleteCartContent$(_context) {
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
          MYSQLQUERY1 = "DELETE FROM bikesCart WHERE bikesCart.codCart = ".concat(id);
          MYSQLQUERY2 = "DELETE FROM accessoriesCart WHERE accessoriesCart.codCart = ".concat(id);
          MYSQLQUERY3 = "DELETE FROM servicesCart WHERE servicesCart.codCart = ".concat(id);
          _context.next = 7;
          return regeneratorRuntime.awrap(connection.promise().execute(MYSQLQUERY1));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(connection.promise().execute(MYSQLQUERY2));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(connection.promise().execute(MYSQLQUERY3));

        case 11:
          return _context.abrupt("return", {
            success: true
          });

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);
          return _context.abrupt("return", {
            success: false,
            error: _context.t0.message
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

module.exports = deleteCartContent;