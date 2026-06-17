"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var mysql = require('mysql2');

var maxId = require('./maxId');

function signOperation(profile) {
  var connection, firstName, lastName, birthDate, email, phone, address, username, password, MYSQLQUERY, max, tot;
  return regeneratorRuntime.async(function signOperation$(_context) {
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
          firstName = profile.firstName;
          lastName = profile.lastName;
          birthDate = profile.birthDate;
          email = profile.email;
          phone = profile.phone;
          address = profile.address;
          username = profile.username;
          password = profile.password;
          MYSQLQUERY = "INSERT INTO customers (name,surname,birth,email,phone,address,username,password) VALUES(\"".concat(firstName, "\",\"").concat(lastName, "\",'").concat(birthDate, "',\"").concat(email, "\",\"").concat(phone, "\",\"").concat(address, "\",\"").concat(username, "\",\"").concat(password, "\")");
          _context.next = 13;
          return regeneratorRuntime.awrap(connection.execute(MYSQLQUERY));

        case 13:
          if (!_context.sent) {
            _context.next = 20;
            break;
          }

          console.log("Query eseguita correttamente");
          _context.next = 17;
          return regeneratorRuntime.awrap(maxId());

        case 17:
          max = _context.sent;
          tot = max.maxId + 1;
          return _context.abrupt("return", {
            success: true,
            id: tot,
            username: username
          });

        case 20:
          _context.next = 27;
          break;

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.log("errore");
          console.error(_context.t0);
          return _context.abrupt("return", {
            success: false
          });

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
}

module.exports = signOperation;