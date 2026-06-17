"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var fs = require('fs');

var _require = require('pdf-lib'),
    PDFDocument = _require.PDFDocument,
    rgb = _require.rgb;

var getSales = require('./getTotalSales');

var getBikes = require('./getTotalBikes');

var getAccessories = require('./getTotalAccessories');

var getServices = require('./getTotalServices');

var getEmployees = require('./getTotalEmployees');

function createReport() {
  var Sales, totalSales, Bikes, BikeNum, BikeValue, Accessories, accNum, accValue, Services, serNum, serValue, Employees, empNum, pdfDoc, page, currentDate, currentMonth, currentYear, title, pdfBytes;
  return regeneratorRuntime.async(function createReport$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(getSales());

        case 2:
          Sales = _context.sent;
          totalSales = Sales.data;
          _context.next = 6;
          return regeneratorRuntime.awrap(getBikes());

        case 6:
          Bikes = _context.sent;
          BikeNum = Bikes.bikeNum;
          BikeValue = Bikes.bikeValue;
          _context.next = 11;
          return regeneratorRuntime.awrap(getAccessories());

        case 11:
          Accessories = _context.sent;
          accNum = Accessories.accNum;
          accValue = Accessories.accValue;
          _context.next = 16;
          return regeneratorRuntime.awrap(getServices());

        case 16:
          Services = _context.sent;
          serNum = Services.serNum;
          serValue = Services.serValue;
          _context.next = 21;
          return regeneratorRuntime.awrap(getEmployees());

        case 21:
          Employees = _context.sent;
          empNum = Employees.emp;
          _context.next = 25;
          return regeneratorRuntime.awrap(PDFDocument.create());

        case 25:
          pdfDoc = _context.sent;
          page = pdfDoc.addPage();
          page.drawText('BikeHeaven', {
            x: 50,
            y: 750,
            size: 12
          });
          page.drawText('Address: Via borgo Rodolfo Tanzi 30/1, 43125 Parma (PR), Emilia-Romagna Italy', {
            x: 50,
            y: 730,
            size: 12
          });
          currentDate = new Date();
          currentMonth = currentDate.toLocaleString('default', {
            month: 'long'
          });
          currentYear = currentDate.getFullYear();
          title = "Monthly report of: ".concat(currentMonth, " - ").concat(currentYear);
          page.drawText(title, {
            x: 50,
            y: 690,
            size: 14
          });
          page.drawText("Total Sales: \u20AC".concat(totalSales), {
            x: 50,
            y: 650,
            size: 12
          });
          page.drawText("Number of Bicycles: ".concat(BikeNum), {
            x: 50,
            y: 630,
            size: 12
          });
          page.drawText("Total Value of Bicycles: \u20AC".concat(BikeValue), {
            x: 50,
            y: 610,
            size: 12
          });
          page.drawText("Number of Accessories: ".concat(accNum), {
            x: 50,
            y: 590,
            size: 12
          });
          page.drawText("Total Value of Accessories: \u20AC".concat(accValue), {
            x: 50,
            y: 570,
            size: 12
          });
          page.drawText("Number of Services Offered: ".concat(serNum), {
            x: 50,
            y: 550,
            size: 12
          });
          page.drawText("Total value of Services Offered: \u20AC".concat(serValue), {
            x: 50,
            y: 530,
            size: 12
          });
          page.drawText("Number of Employees: ".concat(empNum), {
            x: 50,
            y: 510,
            size: 12
          });
          _context.next = 44;
          return regeneratorRuntime.awrap(pdfDoc.save());

        case 44:
          pdfBytes = _context.sent;
          fs.writeFileSync('Monthlyreport.pdf', pdfBytes);

        case 46:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = createReport;