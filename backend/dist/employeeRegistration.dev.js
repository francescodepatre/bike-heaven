"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var mysql = require('mysql2');

function signEmployee(employee) {
  var connection, firstName, lastName, birthDate, email, phone, address, username, password, MYSQLQUERY;
  return regeneratorRuntime.async(function signEmployee$(_context) {
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
          firstName = employee.firstName;
          lastName = employee.lastName;
          birthDate = employee.birthDate;
          email = employee.email;
          phone = employee.phone;
          address = employee.address;
          username = employee.username;
          password = employee.password;
          MYSQLQUERY = "INSERT INTO employees (firstname,lastname,email,phone,address,birth,username,password) VALUES(\"".concat(firstName, "\",\"").concat(lastName, "\",\"").concat(email, "\",\"").concat(phone, "\",\"").concat(address, "\",'").concat(birthDate, "',\"").concat(username, "\",\"").concat(password, "\")");
          _context.next = 13;
          return regeneratorRuntime.awrap(connection.execute(MYSQLQUERY));

        case 13:
          if (!_context.sent) {
            _context.next = 16;
            break;
          }

          console.log("Query eseguita correttamente");
          return _context.abrupt("return", {
            success: true
          });

        case 16:
          _context.next = 23;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.log("errore");
          console.error(_context.t0);
          return _context.abrupt("return", {
            success: false
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

module.exports = signEmployee;