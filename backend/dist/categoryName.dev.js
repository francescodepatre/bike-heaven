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

function searchCategName(id) {
  var connection, MYSQLQUERY, _ref, _ref2, rows, row, category;

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
          MYSQLQUERY = "SELECT categories.name FROM bicycles INNER JOIN categories ON bicycles.codCategory = categories.idcategory WHERE bicycles.id=".concat(id, " UNION SELECT categories.name FROM accessories INNER JOIN categories ON accessories.codCategory = categories.idcategory WHERE accessories.id=").concat(id, " UNION SELECT categories.name FROM services INNER JOIN categories ON services.codCategory = categories.idcategory WHERE services.id=").concat(id);
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
            category: null
          });

        case 11:
          row = rows[0];
          category = row.name;
          _context.next = 15;
          return regeneratorRuntime.awrap(connection.end());

        case 15:
          return _context.abrupt("return", {
            success: true,
            category: category
          });

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 18]]);
}

module.exports = searchCategName;