"use strict";

var fs = require('fs');

var _require = require('pdf-lib'),
    PDFDocument = _require.PDFDocument;

function checkPDF() {
  var pdfBuffer, pdfDoc, form, nameField;
  return regeneratorRuntime.async(function checkPDF$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // Carica il PDF
          pdfBuffer = fs.readFileSync('bh.pdf');
          _context.next = 3;
          return regeneratorRuntime.awrap(PDFDocument.load(pdfBuffer));

        case 3:
          pdfDoc = _context.sent;
          // Verifica la presenza di campi modificabili
          form = pdfDoc.getForm();
          nameField = form.getTextField('totalSales');
          nameField.setText('25,99 €');

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = checkPDF;