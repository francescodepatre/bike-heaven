"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var mysql = require('mysql2');

function removeCartItem(id, category, customer) {
  var connection, table, target, tableAttribute, MYSQLQUERY;
  return regeneratorRuntime.async(function removeCartItem$(_context) {
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
          table = "";
          target = "";
          tableAttribute = "";

          if (category === 1) {
            table = "bikesCart";
            target = "bicycles";
            tableAttribute = "codBicycle";
          } else if (category === 2) {
            table = "accessoriesCart";
            target = "accessories";
            tableAttribute = "codAccessory";
          } else {
            table = "servicesCart";
            target = "services";
            tableAttribute = "codService";
          }

          MYSQLQUERY = "\n            DELETE FROM ".concat(table, "\n            WHERE id IN (\n                SELECT ").concat(table, ".id\n                FROM ").concat(table, "\n                INNER JOIN cart ON ").concat(table, ".codCart = cart.id\n                INNER JOIN ").concat(target, " ON ").concat(table, ".").concat(tableAttribute, " = ").concat(target, ".id\n                WHERE cart.codCustomer = ").concat(customer, " AND ").concat(target, ".id = ").concat(id, "\n            );");
          _context.next = 9;
          return regeneratorRuntime.awrap(connection.execute(MYSQLQUERY));

        case 9:
          if (!_context.sent) {
            _context.next = 12;
            break;
          }

          console.log("Query eseguita correttamente");
          return _context.abrupt("return", {
            success: true
          });

        case 12:
          _context.next = 19;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.log("errore");
          console.error(_context.t0);
          return _context.abrupt("return", {
            success: false
          });

        case 19:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}

module.exports = removeCartItem;