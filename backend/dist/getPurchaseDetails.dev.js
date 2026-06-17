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

var getBikes = require('./getBikes');

var getAccessories = require('./getAccessories');

var getServices = require('./getServices');

var category = require('./categoryName');

var bikeUpdater = require('./updateBikes');

var accessoriesUpdater = require('./updateAccessories');

var servicesUpdater = require('./updateServices');

var updateCart = require('./deleteCartContent');

function getProduct(id, type) {
  var connection, MYSQLQUERY, _ref, _ref2, rows, row, price, total, cat, bikeTotal, accessoryTotal, serviceTotal, _total, updCart;

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

          if (!(type === 'single')) {
            _context.next = 36;
            break;
          }

          MYSQLQUERY = "SELECT price FROM accessories WHERE id = ".concat(id, " UNION SELECT price FROM bicycles WHERE id = ").concat(id, " UNION SELECT price FROM services WHERE id = ").concat(id);
          _context.next = 6;
          return regeneratorRuntime.awrap(connection.promise().query(MYSQLQUERY));

        case 6:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows = _ref2[0];

          if (!(rows.length === 0)) {
            _context.next = 12;
            break;
          }

          console.log("Error no result");
          return _context.abrupt("return", {
            success: false,
            price: null
          });

        case 12:
          row = rows[0];
          price = row.price;
          total = price;
          _context.next = 17;
          return regeneratorRuntime.awrap(connection.end());

        case 17:
          _context.next = 19;
          return regeneratorRuntime.awrap(category(id));

        case 19:
          cat = _context.sent;

          if (!(cat.category === "Road Bicycles" || cat.category === "Mountain Bikes" || cat.category === "City Bikes" || cat.category === "E-bikes" || cat.category === "Bikes for Kids")) {
            _context.next = 25;
            break;
          }

          _context.next = 23;
          return regeneratorRuntime.awrap(bikeUpdater(id));

        case 23:
          _context.next = 33;
          break;

        case 25:
          if (!(cat.category === "Accessories")) {
            _context.next = 30;
            break;
          }

          _context.next = 28;
          return regeneratorRuntime.awrap(accessoriesUpdater(id));

        case 28:
          _context.next = 33;
          break;

        case 30:
          if (!(cat.category === "Services")) {
            _context.next = 33;
            break;
          }

          _context.next = 33;
          return regeneratorRuntime.awrap(servicesUpdater(id));

        case 33:
          return _context.abrupt("return", {
            success: true,
            price: total
          });

        case 36:
          if (!(type === "cart")) {
            _context.next = 59;
            break;
          }

          _context.next = 39;
          return regeneratorRuntime.awrap(getBikes(id));

        case 39:
          bikeTotal = _context.sent;
          console.log("Bikes" + bikeTotal.price);
          _context.next = 43;
          return regeneratorRuntime.awrap(getAccessories(id));

        case 43:
          accessoryTotal = _context.sent;
          console.log("Accessories" + accessoryTotal.price);
          _context.next = 47;
          return regeneratorRuntime.awrap(getServices(id));

        case 47:
          serviceTotal = _context.sent;
          console.log("Services" + serviceTotal.price);
          _total = 0;

          if (bikeTotal && accessoryTotal && serviceTotal) {
            _total = parseInt(bikeTotal.price) + parseInt(accessoryTotal.price) + parseInt(serviceTotal.price);
            console.log("Total price: ", _total);
          }

          if (!(_total > 0)) {
            _context.next = 58;
            break;
          }

          _context.next = 54;
          return regeneratorRuntime.awrap(updateCart(id));

        case 54:
          updCart = _context.sent;
          return _context.abrupt("return", {
            success: true,
            price: _total
          });

        case 58:
          return _context.abrupt("return", {
            success: false,
            price: null
          });

        case 59:
          _context.next = 64;
          break;

        case 61:
          _context.prev = 61;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 64:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 61]]);
}

module.exports = getProduct;