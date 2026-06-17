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

function searchFunction(searchName) {
  var connection, MYSQLQUERY, _ref, _ref2, rows, JSONobjects, jsonData;

  return regeneratorRuntime.async(function searchFunction$(_context) {
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
          console.log("Searching ", searchName);
          MYSQLQUERY = "\n        SELECT bicycles.id, bicycles.name, bicycles.brand, bicycles.price, bicycles.description, bicycles.picture \n        FROM bicycles INNER JOIN categories ON bicycles.codCategory = categories.idcategory \n        WHERE bicycles.name LIKE '%".concat(searchName, "%' OR bicycles.brand LIKE '%").concat(searchName, "%' OR categories.name LIKE '%").concat(searchName, "%'\n        UNION \n        SELECT accessories.id, accessories.name, accessories.brand, accessories.price, accessories.description, accessories.picture \n        FROM accessories INNER JOIN categories ON accessories.codCategory = categories.idcategory \n        WHERE accessories.name LIKE '%").concat(searchName, "%'OR accessories.brand LIKE '%").concat(searchName, "%' OR categories.name LIKE '%").concat(searchName, "%'\n        UNION \n        SELECT services.id, services.name, services.brand, services.price, services.description, services.picture \n        FROM services INNER JOIN categories ON services.codCategory = categories.idcategory\n        WHERE services.name LIKE '%").concat(searchName, "%' OR services.brand LIKE '%").concat(searchName, "%' OR categories.name LIKE '%").concat(searchName, "%'");
          _context.next = 6;
          return regeneratorRuntime.awrap(connection.promise().query(MYSQLQUERY));

        case 6:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];

          if (!(rows.length === 0)) {
            _context.next = 14;
            break;
          }

          console.log("Non ci sono risultati...");
          return _context.abrupt("return", {
            success: false,
            data: null
          });

        case 14:
          console.log("".concat(rows.length, " risultati trovati"));

        case 15:
          JSONobjects = rows.map(function (row) {
            return {
              id: row.id,
              name: row.name,
              brand: row.brand,
              price: row.price,
              desc: row.description,
              picture: row.picture.toString('base64')
            };
          });
          jsonData = {
            oggetti: JSONobjects
          };
          _context.next = 19;
          return regeneratorRuntime.awrap(connection.end());

        case 19:
          return _context.abrupt("return", {
            success: true,
            data: jsonData
          });

        case 22:
          _context.prev = 22;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 22]]);
}

module.exports = searchFunction;