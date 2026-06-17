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

var updateAccessoriesCart = require('./updateAccessoriesCart');

function searchCategName(id) {
  var connection, MYSQLQUERY, _ref, _ref2, rows, row, price, update;

  return regeneratorRuntime.async(function searchCategName$(_context) {
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
          MYSQLQUERY = "\n        SELECT SUM(price) as price \n        FROM accessories \n        JOIN accessoriesCart ON accessories.id = accessoriesCart.Codaccessory \n        JOIN cart ON accessoriesCart.codCart = cart.id \n        WHERE cart.id =  ".concat(id);
          _context.next = 5;
          return regeneratorRuntime.awrap(connection.promise().query(MYSQLQUERY));

        case 5:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];

          if (!(rows.length === 0)) {
            _context.next = 11;
            break;
          }

          console.log("Non ci sono risultati...");
          return _context.abrupt("return", {
            success: false,
            price: null
          });

        case 11:
          row = rows[0];
          price = row.price;

          if (price === null) {
            price = 0;
          }

          _context.next = 16;
          return regeneratorRuntime.awrap(connection.end());

        case 16:
          _context.next = 18;
          return regeneratorRuntime.awrap(updateAccessoriesCart(id));

        case 18:
          update = _context.sent;

          if (!(update && update.success)) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("return", {
            success: true,
            price: price
          });

        case 23:
          return _context.abrupt("return", {
            success: false,
            price: 0
          });

        case 24:
          _context.next = 29;
          break;

        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 29:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 26]]);
}

module.exports = searchCategName;