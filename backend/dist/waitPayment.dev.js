"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var util = require('util');

var setTimeoutPromise = util.promisify(setTimeout);

function waitForSuccess(paymentId) {
  var paymentIntent;
  return regeneratorRuntime.async(function waitForSuccess$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!true) {
            _context.next = 19;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(stripe.paymentIntents.retrieve(paymentId));

        case 3:
          paymentIntent = _context.sent;

          if (!(paymentIntent.status === 'succeeded')) {
            _context.next = 9;
            break;
          }

          console.log('Pagamento completato con successo!');
          return _context.abrupt("return", {
            success: true
          });

        case 9:
          if (!(paymentIntent.status === 'canceled')) {
            _context.next = 14;
            break;
          }

          console.log('Pagamento completato con successo!');
          return _context.abrupt("return", {
            success: false
          });

        case 14:
          console.log('Il pagamento è ancora in corso...');
          _context.next = 17;
          return regeneratorRuntime.awrap(setTimeoutPromise(5000));

        case 17:
          _context.next = 0;
          break;

        case 19:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = waitForSuccess;