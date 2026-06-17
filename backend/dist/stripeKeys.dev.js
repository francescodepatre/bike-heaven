"use strict";

function stripeKeys() {
  var publicKey = "pk_test_51Nh9CuHKIas7nMAJAWJ7Zs6MPhq5i3OA1SNJ0mrxX7SGj8u3ZeX3qXJNO3owTXtNKkeBki4p2JSlcaEUjWdRrsai00ETKqelC5";
  var privateKey = "sk_test_51Nh9CuHKIas7nMAJagwCkYghcVzaJ7ZKowtQKKzeTQFAWcVHxMaYPmd6Q18TaP8czImiRFYjl5ShgJW7LQHNdBaX00LVzxJz0E";
  return {
    "public": publicKey,
    "private": privateKey
  };
}

module.exports = stripeKeys;