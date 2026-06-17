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

function setFeedBack(idProduct, value) {
  var oldFeedback, numFeedback, newFeedback, setFeedback, connection, getOldFeedback, _ref, _ref2, rows1, row1, category, getNumFeedback, _ref3, _ref4, rows2, row2, _numFeedback, oldSum;

  return regeneratorRuntime.async(function setFeedBack$(_context) {
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
          getOldFeedback = "\n        SELECT feedback, codCategory\n        FROM bicycles\n        WHERE id = ".concat(idProduct, "\n        UNION\n        SELECT feedback, codCategory\n        FROM accessories\n        WHERE id = ").concat(idProduct, "\n        UNION\n        SELECT feedback, codCategory\n        FROM services\n        WHERE id = ").concat(idProduct);
          _context.next = 5;
          return regeneratorRuntime.awrap(connection.promise().query(getOldFeedback));

        case 5:
          _ref = _context.sent;
          _ref2 = _slicedToArray(_ref, 1);
          rows1 = _ref2[0];

          if (!(rows1.length === 0)) {
            _context.next = 10;
            break;
          }

          return _context.abrupt("return", {
            success: false
          });

        case 10:
          row1 = rows1[0];
          oldFeedback = row1.feedback;
          category = row1.codCategory;
          getNumFeedback = "\n        SELECT COUNT(id) as \"reviewNum\"\n        FROM reviews\n        WHERE reviews.codProduct = ".concat(idProduct);
          _context.next = 16;
          return regeneratorRuntime.awrap(connection.promise().query(getNumFeedback));

        case 16:
          _ref3 = _context.sent;
          _ref4 = _slicedToArray(_ref3, 1);
          rows2 = _ref4[0];

          if (!(rows2.length === 0)) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", {
            success: false
          });

        case 21:
          row2 = rows2[0];
          numF = row2.reviewNum;
          _numFeedback = parseInt(numF);

          if (oldFeedback === 0) {
            newFeedback = value;
          } else if (oldFeedback != 0) {
            oldSum = oldFeedback * _numFeedback;
            value = parseFloat(value);
            newFeedback = (oldSum + value) / (_numFeedback + 1);
            newFeedback = parseFloat(newFeedback.toFixed(2));
          }

          if (!(category === 1 || category === 2 || category === 3 || category === 4 || category === 5)) {
            _context.next = 35;
            break;
          }

          setFeedback = "UPDATE bicycles SET bicycles.feedback = ".concat(newFeedback, " WHERE bicycles.id = ").concat(idProduct);
          _context.next = 29;
          return regeneratorRuntime.awrap(connection.execute(setFeedback));

        case 29:
          if (!_context.sent) {
            _context.next = 31;
            break;
          }

          return _context.abrupt("return", {
            success: true
          });

        case 31:
          _context.next = 33;
          return regeneratorRuntime.awrap(connection.end());

        case 33:
          _context.next = 52;
          break;

        case 35:
          if (!(category === 6)) {
            _context.next = 45;
            break;
          }

          setFeedback = "UPDATE accessories SET accessories.feedback = ".concat(newFeedback, " WHERE accessories.id = ").concat(idProduct);
          _context.next = 39;
          return regeneratorRuntime.awrap(connection.execute(setFeedback));

        case 39:
          if (!_context.sent) {
            _context.next = 41;
            break;
          }

          return _context.abrupt("return", {
            success: true
          });

        case 41:
          _context.next = 43;
          return regeneratorRuntime.awrap(connection.end());

        case 43:
          _context.next = 52;
          break;

        case 45:
          setFeedback = "UPDATE services SET services.feedback = ".concat(newFeedback, " WHERE services.id = ").concat(idProduct);
          _context.next = 48;
          return regeneratorRuntime.awrap(connection.execute(setFeedback));

        case 48:
          if (!_context.sent) {
            _context.next = 50;
            break;
          }

          return _context.abrupt("return", {
            success: true
          });

        case 50:
          _context.next = 52;
          return regeneratorRuntime.awrap(connection.end());

        case 52:
          _context.next = 57;
          break;

        case 54:
          _context.prev = 54;
          _context.t0 = _context["catch"](0);
          console.error("Error: ", _context.t0);

        case 57:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 54]]);
}

module.exports = setFeedBack;