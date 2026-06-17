"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var mysql = require('mysql2');

function maxId() {
  var connection, MYSQLQUERY, _ref, _ref2, rows, _maxCustomerId;

  return regeneratorRuntime.async(function maxId$(_context) {
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
          MYSQLQUERY = "SELECT MAX(idcustomer) FROM customers;";
          _context.next = 5;
          return regeneratorRuntime.awrap(connection.promise().query(MYSQLQUERY));

        case 5:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];
          _maxCustomerId = rows[0]['MAX(idcustomer)'];
          console.log("Max: " + _maxCustomerId);
          return _context.abrupt("return", {
            success: true,
            maxId: _maxCustomerId
          });

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          console.error("Errore durante l'operazione:", _context.t0);
          return _context.abrupt("return", {
            success: false,
            maxId: maxCustomerId
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

module.exports = maxId;