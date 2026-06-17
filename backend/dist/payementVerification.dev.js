"use strict";

function payVerification(cardNumber, expirationDate, CVV) {
  if (cardNumber.length >= 13 && cardNumber.length <= 19) {
    if (expirationDate >= "Data odierna") {
      if (CVV.length === 3) {}
    }
  }
}