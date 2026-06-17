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

var categoryFinder = require('./categoryName');

function getProduct(id) {
  var connection, categoryName, MYSQLQUERY, _ref, _ref2, rows, row, name, price, description, feedback, brand, frame, dimensions, gear, brakes, suspensions, weight, quantity, picture, product, _MYSQLQUERY, _ref3, _ref4, _rows, _row, _name, _price, _description, _feedback, _brand, _quantity, _picture, _product, _MYSQLQUERY2, _ref5, _ref6, _rows2, _row2, _name2, _price2, _description2, _feedback2, _brand2, _picture2, _product2;

  return regeneratorRuntime.async(function getProduct$(_context) {
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
          _context.next = 4;
          return regeneratorRuntime.awrap(categoryFinder(id));

        case 4:
          categoryName = _context.sent;

          if (!(categoryName.category === "Road Bicycles" || categoryName.category === "Mountain Bikes" || categoryName.category === "City Bikes" || categoryName.category === "E-bikes" || categoryName.category === "Bikes for Kids")) {
            _context.next = 35;
            break;
          }

          MYSQLQUERY = "SELECT * FROM bicycles WHERE bicycles.id = ".concat(id);
          _context.next = 9;
          return regeneratorRuntime.awrap(connection.promise().query(MYSQLQUERY));

        case 9:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];

          if (!(rows.length === 0)) {
            _context.next = 15;
            break;
          }

          console.log("Error no result");
          return _context.abrupt("return", {
            success: false,
            category: null,
            data: null
          });

        case 15:
          row = rows[0];
          name = row.name;
          price = row.price;
          description = row.description;
          feedback = row.feedback;
          brand = row.brand;
          frame = row.frame;
          dimensions = row.dimensions;
          gear = row.gear;
          brakes = row.brakes;
          suspensions = row.suspensions;
          weight = row.weight;
          quantity = row.quantity;
          picture = row.picture.toString('base64');
          product = {
            name: name,
            price: price,
            description: description,
            feedback: feedback,
            brand: brand,
            frame: frame,
            dimensions: dimensions,
            gear: gear,
            brakes: brakes,
            suspensions: suspensions,
            weight: weight,
            quantity: quantity,
            picture: picture
          };
          _context.next = 32;
          return regeneratorRuntime.awrap(connection.end());

        case 32:
          return _context.abrupt("return", {
            success: true,
            category: categoryName.category,
            product: product
          });

        case 35:
          if (!(categoryName.category === "Accessories")) {
            _context.next = 59;
            break;
          }

          _MYSQLQUERY = "SELECT * FROM accessories WHERE accessories.id = ".concat(id);
          _context.next = 39;
          return regeneratorRuntime.awrap(connection.promise().query(_MYSQLQUERY));

        case 39:
          _ref3 = _context.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          _rows = _ref4[0];

          if (!(_rows.length === 0)) {
            _context.next = 45;
            break;
          }

          console.log("Error no result");
          return _context.abrupt("return", {
            success: false,
            category: null,
            data: null
          });

        case 45:
          _row = _rows[0];
          _name = _row.name;
          _price = _row.price;
          _description = _row.description;
          _feedback = _row.feedback;
          _brand = _row.brand;
          _quantity = _row.quantity;
          _picture = _row.picture.toString('base64');
          _product = {
            name: _name,
            price: _price,
            description: _description,
            feedback: _feedback,
            brand: _brand,
            quantity: _quantity,
            picture: _picture
          };
          _context.next = 56;
          return regeneratorRuntime.awrap(connection.end());

        case 56:
          return _context.abrupt("return", {
            success: true,
            category: categoryName.category,
            product: _product
          });

        case 59:
          if (!(categoryName.category === "Services")) {
            _context.next = 80;
            break;
          }

          _MYSQLQUERY2 = "SELECT * FROM services WHERE services.id = ".concat(id);
          _context.next = 63;
          return regeneratorRuntime.awrap(connection.promise().query(_MYSQLQUERY2));

        case 63:
          _ref5 = _context.sent;
          _ref6 = _slicedToArray(_ref5, 1);
          _rows2 = _ref6[0];

          if (!(_rows2.length === 0)) {
            _context.next = 69;
            break;
          }

          console.log("Error no result");
          return _context.abrupt("return", {
            success: false,
            category: null,
            data: null
          });

        case 69:
          _row2 = _rows2[0];
          _name2 = _row2.name;
          _price2 = _row2.price;
          _description2 = _row2.description;
          _feedback2 = _row2.feedback;
          _brand2 = _row2.brand;
          _picture2 = _row2.picture.toString('base64');
          _product2 = {
            name: _name2,
            price: _price2,
            description: _description2,
            feedback: _feedback2,
            brand: _brand2,
            picture: _picture2
          };
          _context.next = 79;
          return regeneratorRuntime.awrap(connection.end());

        case 79:
          return _context.abrupt("return", {
            success: true,
            category: categoryName.category,
            product: _product2
          });

        case 80:
          _context.next = 85;
          break;

        case 82:
          _context.prev = 82;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 85:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 82]]);
}

module.exports = getProduct;