"use strict";

/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
var bodyParser = require('body-parser');

var express = require('express');

var jwt = require('jsonwebtoken');

var app = express();

var loginOperation = require('./login_operation');

var registerOperation = require('./registration_operation');

var homeReq = require('./home_last');

var contactReq = require('./contact_request');

var searchEng = require('./search');

var searchCat = require('./searchCategory');

var productDetails = require('./prodSrc');

var categoryFinder = require('./categoryName');

var getBikes = require("./bikeCart");

var getAccessories = require("./accessoryCart");

var getServices = require("./serviceCart");

var productAdd = require("./productAdder");

var getCart = require("./getCartByID");

var cartCreator = require("./cartCreator");

var maxId = require('./maxId');

var PORT = 8000;
var secretKey = 'Francesco01.';
var privateStripe = "sk_test_51Nh9CuHKIas7nMAJagwCkYghcVzaJ7ZKowtQKKzeTQFAWcVHxMaYPmd6Q18TaP8czImiRFYjl5ShgJW7LQHNdBaX00LVzxJz0E";

var stripe = require('stripe')(privateStripe);

var customerFinder = require('./findCustomer');

var infoSender = require('./payInfoSender');

var purchaseDetails = require('./getPurchaseDetails');

var getDetails = require('./getDetails');

var getAddress = require('./getAddress');

var getData = require('./getData');

var updateAddressInfo = require('./setAddress');

var updateDetails = require('./setDetails');

var updateData = require('./setData');

var getInventory = require('./getInventory');

var getSales = require('./getSales');

var getShipments = require('./getShipments');

var getEmployees = require('./getEmployees');

var setEmployees = require('./employeeRegistration');

var del = require('./deleteEmployee');

var createReport = require('./createReport');

var fs = require('fs');

var path = require('path');

var refundOperation = require('./refundOperation');

var setBike = require('./setBike');

var setAccessory = require('./setAccessory');

var setService = require('./setService');

var removeBike = require('./deleteBike');

var removeAccessories = require('./deleteAccessory');

var removeService = require('./deleteService');

var bikeTable = require('./bikeTable');

var accessoryTable = require('./accessoryTable');

var serviceTable = require('./serviceTable');

var empLogin = require('./employeesLoginOperation');

var getReviews = require('./getReviews');

var setFeedBack = require('./setFeedBack');

var setReview = require('./setReview');

var checkEmployee = require('./checkEmployee');

var removeCartItem = require('./removeCartItem');

var addBikeQuantity = require('./addBikeQ');

var addAccessoryQuantity = require('./addAccessoryQ');

app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.post('/api/register', function _callee(req, res) {
  var profile, reg, user_reg, token, test_src, createCart;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          profile = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            username: req.body.username,
            password: req.body.password
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(registerOperation(profile));

        case 4:
          reg = _context.sent;

          if (!(reg && reg.success)) {
            _context.next = 20;
            break;
          }

          console.log("Register success");
          user_reg = {
            id: reg.id,
            user: reg.username
          };
          console.log("ID dell'utente: ", reg.id);
          console.log("user_reg: ", user_reg);
          token = jwt.sign(user_reg, secretKey, {
            expiresIn: '5h'
          });
          _context.next = 13;
          return regeneratorRuntime.awrap(maxId());

        case 13:
          test_src = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(cartCreator(test_src.maxId));

        case 16:
          createCart = _context.sent;
          res.status(200).json({
            success: true,
            token: token
          });
          _context.next = 22;
          break;

        case 20:
          console.log("Register unsuccessful");
          res.status(500).json({
            success: false,
            message: 'Internal server error'
          });

        case 22:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post('/api/login', function _callee2(req, res) {
  var auth, user, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log(req.body);
          console.log("Username: " + req.body.username);
          console.log("Password: " + req.body.password);
          _context2.next = 5;
          return regeneratorRuntime.awrap(loginOperation(req.body.username, req.body.password));

        case 5:
          auth = _context2.sent;

          if (auth && auth.success) {
            console.log("Returning success");
            console.log("User: " + auth.username + " id: " + auth.id);
            user = {
              id: auth.id,
              user: auth.username
            };
            token = jwt.sign(user, secretKey, {
              expiresIn: '5h'
            });
            console.log("Token: " + token);
            res.status(200).json({
              success: true,
              message: "Login successful",
              token: token
            });
          } else {
            console.log("Returning failure");
            res.status(401).json({
              success: false,
              message: "Login failed"
            });
          }

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.get('/api/home', function _callee3(req, res) {
  var home;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(homeReq());

        case 2:
          home = _context3.sent;

          if (home && home.success) {
            res.status(200).json({
              success: true,
              data: home.data
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
app.post('/api/contact', function _callee4(req, res) {
  var firstName, lastName, email, message, contact;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          console.log(req.body);
          firstName = req.body.firstName;
          lastName = req.body.lastName;
          email = req.body.email;
          message = req.body.message;
          console.log("First name: ", firstName);
          console.log("Last name: ", lastName);
          console.log("Email: ", email);
          console.log("Message: ", message);
          _context4.next = 11;
          return regeneratorRuntime.awrap(contactReq(firstName, lastName, email, message));

        case 11:
          contact = _context4.sent;

          if (contact && contact.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  });
});
app.get("/api/search/:searchName", function _callee5(req, res) {
  var searchName, src;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          searchName = req.params.searchName;
          _context5.next = 3;
          return regeneratorRuntime.awrap(searchEng(searchName));

        case 3:
          src = _context5.sent;

          if (src && src.success) {
            res.status(200).json({
              success: true,
              data: src.data
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 5:
        case "end":
          return _context5.stop();
      }
    }
  });
});
app.get("/api/categorySearch/:category", function _callee6(req, res) {
  var category, src;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          category = req.params.category;
          _context6.next = 3;
          return regeneratorRuntime.awrap(searchCat(category));

        case 3:
          src = _context6.sent;

          if (src && src.success) {
            res.status(200).json({
              success: true,
              data: src.data
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 5:
        case "end":
          return _context6.stop();
      }
    }
  });
});
app.get("/api/productSearch/:id", function _callee7(req, res) {
  var id, src;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          console.log("ID: ", id);
          _context7.next = 4;
          return regeneratorRuntime.awrap(productDetails(id));

        case 4:
          src = _context7.sent;

          if (src && src.success) {
            res.status(200).json({
              success: true,
              category: src.category,
              productDetails: src.product
            });
          } else {
            res.status(500).json({
              success: false,
              category: null
            });
          }

        case 6:
        case "end":
          return _context7.stop();
      }
    }
  });
});
app.get("/api/getCart/:token", function _callee8(req, res) {
  var token, decodedToken, id, srcBike, srcAcc, srcSer, idCart;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          token = req.params.token;
          console.log("token: ", token);
          console.log("Payload del token: ", jwt.decode(token));
          decodedToken = jwt.verify(token, secretKey);
          console.log("decoded token: ", decodedToken);
          id = decodedToken.id;
          console.log("id: ", id);
          _context8.next = 9;
          return regeneratorRuntime.awrap(getBikes(id));

        case 9:
          srcBike = _context8.sent;
          _context8.next = 12;
          return regeneratorRuntime.awrap(getAccessories(id));

        case 12:
          srcAcc = _context8.sent;
          _context8.next = 15;
          return regeneratorRuntime.awrap(getServices(id));

        case 15:
          srcSer = _context8.sent;
          _context8.next = 18;
          return regeneratorRuntime.awrap(getCart(id));

        case 18:
          idCart = _context8.sent;
          console.log("Cart: ", idCart.idcart);

          if (srcBike && srcBike.success && srcAcc && srcAcc.success && srcSer && srcSer.success) {
            res.status(200).json({
              success: true,
              idCart: idCart.idcart,
              bikes: srcBike.data,
              accessories: srcAcc.data,
              services: srcSer.data
            });
          } else {
            res.status(500).json({
              success: false,
              bikes: null,
              accessories: null,
              services: null
            });
          }

        case 21:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //nella richiesta di aggiunta al carrello viene ricevuto il token del cliente viene  l'id del prodotto 
//occorre chiamare una funzione che ritorni la categoria del prodotto (categoryName.js) e successivamente si aggiunge il prodotto alla rispettiva tabella

app.post("/api/addProduct", function _callee9(req, res) {
  var token, decodedToken, idCus, idProduct, findCart, categoryName, appProd;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          console.log(req.body);
          token = req.body.userToken;
          decodedToken = jwt.verify(token, secretKey);
          idCus = decodedToken.id;
          idProduct = req.body.productID;
          console.log("idProduct: " + idProduct);
          console.log("idCustomer: " + idCus);
          _context9.next = 9;
          return regeneratorRuntime.awrap(getCart(idCus));

        case 9:
          findCart = _context9.sent;
          _context9.next = 12;
          return regeneratorRuntime.awrap(categoryFinder(idProduct));

        case 12:
          categoryName = _context9.sent;
          _context9.next = 15;
          return regeneratorRuntime.awrap(productAdd(findCart.idcart, idProduct, categoryName.category));

        case 15:
          appProd = _context9.sent;

          if (appProd && appProd.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 17:
        case "end":
          return _context9.stop();
      }
    }
  });
});
app.get("/api/testSearch", function _callee10(req, res) {
  var test_src;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(maxId());

        case 2:
          test_src = _context10.sent;
          console.log("MaxId: " + test_src.maxId);

          if (test_src && test_src.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 5:
        case "end":
          return _context10.stop();
      }
    }
  });
});
app.get('/api/getAddress/:token', function _callee11(req, res) {
  var token, decodedToken, idCustomer, getAddressInfo;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          token = req.params.token;
          decodedToken = jwt.verify(token, secretKey);
          idCustomer = decodedToken.id;
          _context11.next = 5;
          return regeneratorRuntime.awrap(getAddress(idCustomer));

        case 5:
          getAddressInfo = _context11.sent;

          if (getAddressInfo && getAddressInfo.success) {
            res.status(200).json({
              success: true,
              email: getAddressInfo.email,
              phone: getAddressInfo.phone,
              address: getAddressInfo.address
            });
          } else {
            res.status(500).json({
              success: false,
              email: null,
              phone: null,
              address: null
            });
          }

        case 7:
        case "end":
          return _context11.stop();
      }
    }
  });
});
app.post('/api/setAddress', function _callee12(req, res) {
  var decodedToken, idCustomer, setAddressInfo;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          decodedToken = jwt.verify(req.body.token, secretKey);
          idCustomer = decodedToken.id;
          setAddressInfo = updateAddressInfo(idCustomer, req.body.address, req.body.email, req.body.phone);

          if (setAddressInfo && setAddressInfo.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 4:
        case "end":
          return _context12.stop();
      }
    }
  });
});
app.get('/api/getDetails/:token', function _callee13(req, res) {
  var token, decodedToken, idCustomer, detailInfo;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          token = req.params.token;
          decodedToken = jwt.verify(token, secretKey);
          idCustomer = decodedToken.id;
          _context13.next = 5;
          return regeneratorRuntime.awrap(getDetails(idCustomer));

        case 5:
          detailInfo = _context13.sent;

          if (detailInfo && detailInfo.success) {
            res.status(200).json({
              success: true,
              firstName: detailInfo.name,
              lastName: detailInfo.surname,
              birthDate: detailInfo.birth
            });
          } else {
            res.status(500).json({
              success: false,
              firstName: null,
              lastName: null,
              birthDate: null
            });
          }

        case 7:
        case "end":
          return _context13.stop();
      }
    }
  });
});
app.post('/api/setDetails', function _callee14(req, res) {
  var decodedToken, idCustomer, setDetailInfo;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          decodedToken = jwt.verify(req.body.token, secretKey);
          idCustomer = decodedToken.id;
          setDetailInfo = updateDetails(idCustomer, req.body.name, req.body.surname, req.body.birth);

          if (setDetailInfo && setDetailInfo.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 4:
        case "end":
          return _context14.stop();
      }
    }
  });
});
app.post('/api/setData', function _callee15(req, res) {
  var decodedToken, idCustomer, setData;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          decodedToken = jwt.verify(req.body.token, secretKey);
          idCustomer = decodedToken.id;
          setData = updateData(idCustomer, req.body.username, req.body.password);

          if (setData && setData.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 4:
        case "end":
          return _context15.stop();
      }
    }
  });
});
app.get('/api/getData/:token', function _callee16(req, res) {
  var token, decodedToken, idCustomer, data;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          token = req.params.token;
          decodedToken = jwt.verify(token, secretKey);
          idCustomer = decodedToken.id;
          _context16.next = 5;
          return regeneratorRuntime.awrap(getData(idCustomer));

        case 5:
          data = _context16.sent;

          if (data && data.success) {
            res.status(200).json({
              success: true,
              username: data.username,
              password: data.password
            });
          } else {
            res.status(500).json({
              success: true,
              username: null,
              password: null
            });
          }

        case 7:
        case "end":
          return _context16.stop();
      }
    }
  });
});
app.get('/api/inventory', function _callee17(req, res) {
  var inventory;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return regeneratorRuntime.awrap(getInventory());

        case 2:
          inventory = _context17.sent;

          if (inventory && inventory.success) {
            res.status(200).json({
              success: true,
              data: inventory.data.oggetti
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 4:
        case "end":
          return _context17.stop();
      }
    }
  });
});
app.get('/api/sales', function _callee18(req, res) {
  var sales;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.next = 2;
          return regeneratorRuntime.awrap(getSales());

        case 2:
          sales = _context18.sent;

          if (sales && sales.success) {
            res.status(200).json({
              success: true,
              data: sales.data.oggetti
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 4:
        case "end":
          return _context18.stop();
      }
    }
  });
});
app.get('/api/shipments', function _callee19(req, res) {
  var shipments;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.next = 2;
          return regeneratorRuntime.awrap(getShipments());

        case 2:
          shipments = _context19.sent;

          if (shipments && shipments.success) {
            res.status(200).json({
              success: true,
              data: shipments.data.oggetti
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 4:
        case "end":
          return _context19.stop();
      }
    }
  });
});
app.get('/api/employees', function _callee20(req, res) {
  var employees;
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          _context20.next = 2;
          return regeneratorRuntime.awrap(getEmployees());

        case 2:
          employees = _context20.sent;

          if (employees && employees.success) {
            res.status(200).json({
              success: true,
              data: employees.data.oggetti
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 4:
        case "end":
          return _context20.stop();
      }
    }
  });
});
app.post('/api/setEmployee', function _callee21(req, res) {
  var employee, setEmp;
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          employee = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            username: req.body.username,
            password: req.body.password
          };
          _context21.next = 3;
          return regeneratorRuntime.awrap(setEmployees(employee));

        case 3:
          setEmp = _context21.sent;

          if (setEmp && setEmp.success) {
            console.log("Employee registration success");
            res.status(200).json({
              success: true
            });
          } else {
            console.log("Register unsuccessful");
            res.status(500).json({
              success: false,
              message: 'Internal server error'
            });
          }

        case 5:
        case "end":
          return _context21.stop();
      }
    }
  });
});
app.post('/api/deleteEmployee', function _callee22(req, res) {
  var deleteId, deleteEmployee;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          deleteId = req.body.id;
          _context22.next = 3;
          return regeneratorRuntime.awrap(del(deleteId));

        case 3:
          deleteEmployee = _context22.sent;

          if (deleteEmployee && deleteEmployee.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false,
              message: 'Internal server error'
            });
          }

        case 5:
        case "end":
          return _context22.stop();
      }
    }
  });
});
app.get('/api/download', function _callee23(req, res) {
  var report, filePath, fileName, fileStream;
  return regeneratorRuntime.async(function _callee23$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          _context23.next = 2;
          return regeneratorRuntime.awrap(createReport());

        case 2:
          report = _context23.sent;
          filePath = path.join("./Monthlyreport.pdf");
          fileName = 'Monthlyreport.pdf';
          res.setHeader('Content-Disposition', "attachment; filename=\"".concat(fileName, "\""));
          res.setHeader('Content-Type', 'application/octet-stream');
          fileStream = fs.createReadStream(filePath);
          fileStream.pipe(res);

        case 9:
        case "end":
          return _context23.stop();
      }
    }
  });
});
app.post('/api/refund', function _callee24(req, res) {
  var saleId, refund;
  return regeneratorRuntime.async(function _callee24$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          saleId = req.body.id;
          _context24.next = 3;
          return regeneratorRuntime.awrap(refundOperation(saleId));

        case 3:
          refund = _context24.sent;

          if (refund && refund.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 5:
        case "end":
          return _context24.stop();
      }
    }
  });
});
app.post('/api/setBike', function _callee25(req, res) {
  var bike, createBike;
  return regeneratorRuntime.async(function _callee25$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          bike = req.body;
          _context25.next = 3;
          return regeneratorRuntime.awrap(setBike(bike));

        case 3:
          createBike = _context25.sent;

          if (createBike && createBike.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 5:
        case "end":
          return _context25.stop();
      }
    }
  });
});
app.post('/api/setAccessory', function _callee26(req, res) {
  var accessory, createAccessory;
  return regeneratorRuntime.async(function _callee26$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          accessory = req.body;
          _context26.next = 3;
          return regeneratorRuntime.awrap(setAccessory(accessory));

        case 3:
          createAccessory = _context26.sent;

          if (createAccessory && createAccessory.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 5:
        case "end":
          return _context26.stop();
      }
    }
  });
});
app.post('/api/postService', function _callee27(req, res) {
  var service, postService;
  return regeneratorRuntime.async(function _callee27$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          service = req.body;
          _context27.next = 3;
          return regeneratorRuntime.awrap(setService(service));

        case 3:
          postService = _context27.sent;

          if (postService && postService.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 5:
        case "end":
          return _context27.stop();
      }
    }
  });
});
app.post('/api/removeBike', function _callee28(req, res) {
  var bikeId, remBike;
  return regeneratorRuntime.async(function _callee28$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          bikeId = req.body.id;
          _context28.next = 3;
          return regeneratorRuntime.awrap(removeBike(bikeId));

        case 3:
          remBike = _context28.sent;

          if (remBike && remBike.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 5:
        case "end":
          return _context28.stop();
      }
    }
  });
});
app.post('/api/removeAccessory', function _callee29(req, res) {
  var accId, remAcc;
  return regeneratorRuntime.async(function _callee29$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          accId = req.body.id;
          _context29.next = 3;
          return regeneratorRuntime.awrap(removeAccessories(accId));

        case 3:
          remAcc = _context29.sent;

          if (remAcc && remAcc.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 5:
        case "end":
          return _context29.stop();
      }
    }
  });
});
app.post('/api/removeService', function _callee30(req, res) {
  var serId, remSer;
  return regeneratorRuntime.async(function _callee30$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          serId = req.body.id;
          _context30.next = 3;
          return regeneratorRuntime.awrap(removeService(serId));

        case 3:
          remSer = _context30.sent;

          if (remSer && remSer.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 5:
        case "end":
          return _context30.stop();
      }
    }
  });
});
app.get('/api/bikeList', function _callee31(req, res) {
  var bikes;
  return regeneratorRuntime.async(function _callee31$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          _context31.next = 2;
          return regeneratorRuntime.awrap(bikeTable());

        case 2:
          bikes = _context31.sent;

          if (bikes && bikes.success) {
            res.status(200).json({
              success: true,
              data: bikes.data.oggetti
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 4:
        case "end":
          return _context31.stop();
      }
    }
  });
});
app.get('/api/accessoryList', function _callee32(req, res) {
  var accessories;
  return regeneratorRuntime.async(function _callee32$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          _context32.next = 2;
          return regeneratorRuntime.awrap(accessoryTable());

        case 2:
          accessories = _context32.sent;

          if (accessories && accessories.success) {
            res.status(200).json({
              success: true,
              data: accessories.data.oggetti
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 4:
        case "end":
          return _context32.stop();
      }
    }
  });
});
app.get('/api/serviceList', function _callee33(req, res) {
  var services;
  return regeneratorRuntime.async(function _callee33$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          _context33.next = 2;
          return regeneratorRuntime.awrap(serviceTable());

        case 2:
          services = _context33.sent;

          if (services && services.success) {
            res.status(200).json({
              success: true,
              data: services.data.oggetti
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 4:
        case "end":
          return _context33.stop();
      }
    }
  });
});
app.post('/api/employeesLogin', function _callee34(req, res) {
  var auth, user, token;
  return regeneratorRuntime.async(function _callee34$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          _context34.next = 2;
          return regeneratorRuntime.awrap(empLogin(req.body.username, req.body.password));

        case 2:
          auth = _context34.sent;

          if (auth && auth.success) {
            console.log("Returning success");
            console.log("User: " + auth.username + " id: " + auth.id);
            user = {
              id: auth.id,
              user: auth.username
            };
            token = jwt.sign(user, secretKey, {
              expiresIn: '5h'
            });
            console.log("Token: " + token);
            res.status(200).json({
              success: true,
              message: "Login successful",
              token: token
            });
          } else {
            console.log("Returning failure");
            res.status(401).json({
              success: false,
              message: "Login failed"
            });
          }

        case 4:
        case "end":
          return _context34.stop();
      }
    }
  });
});
app.get('/api/getReviews/:idprod', function _callee35(req, res) {
  var idprod, getRev;
  return regeneratorRuntime.async(function _callee35$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          idprod = req.params.idprod;
          console.log(idprod);
          _context35.next = 4;
          return regeneratorRuntime.awrap(getReviews(idprod));

        case 4:
          getRev = _context35.sent;

          if (getRev && getRev.success) {
            res.status(200).json({
              success: true,
              data: getRev.data.oggetti
            });
          } else {
            res.status(500).json({
              success: false,
              data: null
            });
          }

        case 6:
        case "end":
          return _context35.stop();
      }
    }
  });
});
app.post('/api/setReview', function _callee36(req, res) {
  var decodedToken, idCustomer, value, content, product, uploadReview, updateFeedback;
  return regeneratorRuntime.async(function _callee36$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          decodedToken = jwt.verify(req.body.token, secretKey);
          idCustomer = decodedToken.id;
          value = req.body.value;
          content = req.body.content;
          product = req.body.codProduct;
          _context36.next = 7;
          return regeneratorRuntime.awrap(setReview(idCustomer, value, content, product));

        case 7:
          uploadReview = _context36.sent;

          if (!(uploadReview && uploadReview.success)) {
            _context36.next = 15;
            break;
          }

          _context36.next = 11;
          return regeneratorRuntime.awrap(setFeedBack(product, value));

        case 11:
          updateFeedback = _context36.sent;

          if (updateFeedback && updateFeedback.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

          _context36.next = 16;
          break;

        case 15:
          res.status(500).json({
            success: false
          });

        case 16:
        case "end":
          return _context36.stop();
      }
    }
  });
});
app.get('/api/checkEmployee/:id', function _callee37(req, res) {
  var idEmployee, check;
  return regeneratorRuntime.async(function _callee37$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          idEmployee = req.params.id;
          _context37.next = 3;
          return regeneratorRuntime.awrap(checkEmployee(idEmployee));

        case 3:
          check = _context37.sent;

          if (check && check.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 5:
        case "end":
          return _context37.stop();
      }
    }
  });
});
app.post('/api/removeCard', function _callee38(req, res) {
  var remove;
  return regeneratorRuntime.async(function _callee38$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          _context38.next = 2;
          return regeneratorRuntime.awrap(removeCartItem(req.body.id, req.body.category, req.body.customer));

        case 2:
          remove = _context38.sent;

          if (remove && remove.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 4:
        case "end":
          return _context38.stop();
      }
    }
  });
});
app.post('/api/increaseBike', function _callee39(req, res) {
  var increase;
  return regeneratorRuntime.async(function _callee39$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          _context39.next = 2;
          return regeneratorRuntime.awrap(addBikeQuantity(req.body.id, req.body.quantity));

        case 2:
          increase = _context39.sent;

          if (increase && increase.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 4:
        case "end":
          return _context39.stop();
      }
    }
  });
});
app.post('/api/increaseAccessory', function _callee40(req, res) {
  var increase;
  return regeneratorRuntime.async(function _callee40$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          _context40.next = 2;
          return regeneratorRuntime.awrap(addAccessoryQuantity(req.body.id, req.body.quantity));

        case 2:
          increase = _context40.sent;

          if (increase && increase.success) {
            res.status(200).json({
              success: true
            });
          } else {
            res.status(500).json({
              success: false
            });
          }

        case 4:
        case "end":
          return _context40.stop();
      }
    }
  });
});
app.post('/api/payment', function _callee41(req, res) {
  var decodedToken, idCus, customer, purchase, paymentToken, preAmount, amount, paymentMethod, paymentIntent, info;
  return regeneratorRuntime.async(function _callee41$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          console.log(req.body);
          decodedToken = jwt.verify(req.body.token, secretKey);
          idCus = decodedToken.id;
          _context41.next = 5;
          return regeneratorRuntime.awrap(customerFinder(idCus));

        case 5:
          customer = _context41.sent;
          _context41.next = 8;
          return regeneratorRuntime.awrap(purchaseDetails(req.body.id, req.body.type));

        case 8:
          purchase = _context41.sent;
          _context41.prev = 9;
          paymentToken = req.body.paymentToken;
          preAmount = purchase.price * 100;
          amount = parseInt(preAmount) + 1000;
          _context41.next = 15;
          return regeneratorRuntime.awrap(stripe.paymentMethods.create({
            type: 'card',
            card: {
              token: paymentToken
            }
          }));

        case 15:
          paymentMethod = _context41.sent;
          _context41.next = 18;
          return regeneratorRuntime.awrap(stripe.paymentIntents.create({
            amount: amount,
            currency: 'eur',
            payment_method_types: ['card'],
            payment_method: paymentMethod.id,
            confirm: true
          }));

        case 18:
          paymentIntent = _context41.sent;
          _context41.next = 21;
          return regeneratorRuntime.awrap(infoSender(customer, purchase));

        case 21:
          info = _context41.sent;
          res.status(200).json({
            success: true,
            paymentIntent: paymentIntent
          });
          _context41.next = 29;
          break;

        case 25:
          _context41.prev = 25;
          _context41.t0 = _context41["catch"](9);
          console.error(_context41.t0);
          res.status(500).json({
            success: false,
            error: _context41.t0.message
          });

        case 29:
        case "end":
          return _context41.stop();
      }
    }
  }, null, null, [[9, 25]]);
});
app.listen(PORT, function () {
  console.log("listening on port ".concat(PORT));
});