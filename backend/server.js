/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const loginOperation = require('./login_operation')
const registerOperation = require('./registration_operation')
const homeReq = require('./home_last')
const contactReq = require('./contact_request')
const searchEng = require('./search')
const searchCat = require('./searchCategory')
const productDetails = require('./prodSrc')
const categoryFinder = require('./categoryName')
const getBikes = require("./bikeCart")
const getAccessories = require("./accessoryCart")
const getServices = require("./serviceCart")
const productAdd = require("./productAdder")
const getCart = require("./getCartByID")
const cartCreator = require("./cartCreator")
const maxId = require('./maxId')
const PORT = process.env.PORT
const secretKey = process.env.JWT_SECRET
const privateStripe = process.env.STRIPE_SECRET
const stripe = require('stripe')(privateStripe)
const customerFinder = require('./findCustomer')
const infoSender = require('./payInfoSender')
const purchaseDetails = require('./getPurchaseDetails')
const getDetails = require('./getDetails')
const getAddress = require('./getAddress')
const getData = require('./getData')
const updateAddressInfo = require('./setAddress')
const updateDetails = require('./setDetails')
const updateData = require('./setData')
const getInventory = require('./getInventory')
const getSales = require('./getSales')
const getShipments = require('./getShipments')
const getEmployees = require('./getEmployees')
const setEmployees = require('./employeeRegistration')
const del = require('./deleteEmployee')
const createReport = require('./createReport')
const fs = require('fs')
const path = require('path')
const refundOperation = require('./refundOperation')
const setBike = require('./setBike')
const setAccessory = require('./setAccessory')
const setService = require('./setService')
const removeBike = require('./deleteBike')
const removeAccessories = require('./deleteAccessory')
const removeService = require('./deleteService')
const bikeTable = require('./bikeTable')
const accessoryTable = require('./accessoryTable')
const serviceTable = require('./serviceTable')
const empLogin = require('./employeesLoginOperation')
const getReviews = require('./getReviews')
const setFeedBack = require('./setFeedBack')
const setReview = require('./setReview')
const checkEmployee = require('./checkEmployee')
const removeCartItem = require('./removeCartItem')
const addBikeQuantity = require('./addBikeQ')
const addAccessoryQuantity = require('./addAccessoryQ')

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    const profile = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password
    }
    
    const reg = await registerOperation(profile)
    
    if (reg && reg.success){
        console.log("Register success")
        const user_reg = {
            id: reg.id,
            user: reg.username
        }
        console.log("ID dell'utente: ", reg.id);
        console.log("user_reg: ", user_reg);
        const token = jwt.sign(user_reg, secretKey, {expiresIn: '5h'})
        const test_src = await maxId()
        const createCart = await cartCreator(test_src.maxId)
        res.status(200).json({
            success: true,
            token: token
        })
    }
    else{
        console.log("Register unsuccessful")
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

app.post('/api/login', async (req, res) => {
    console.log(req.body)
    console.log("Username: " + req.body.username)
    console.log("Password: " + req.body.password)
    const auth = await loginOperation(req.body.username, req.body.password)
    if (auth && auth.success){
        console.log("Returning success")
        console.log("User: " + auth.username + " id: " + auth.id)
        const user = {
            id: auth.id,
            user: auth.username
        }
        const token = jwt.sign(user, secretKey, {expiresIn: '5h'})
        console.log("Token: " + token)
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token
        })
    }
    else{
        console.log("Returning failure")
        res.status(401).json({
            success: false,
            message: "Login failed"
        })
    }
})

app.get('/api/home', async (req, res) => {
    const home = await homeReq()
    if (home && home.success){
        res.status(200).json({
            success:true,
            data: home.data
        })
    }
    else{
        res.status(500).json({
            success:false,
            data: null
        })
    }
})

app.post('/api/contact', async (req, res) => {
    console.log(req.body)
    var firstName = req.body.firstName
    var lastName = req.body.lastName
    var email = req.body.email
    var message = req.body.message
    console.log("First name: ", firstName)
    console.log("Last name: ", lastName)
    console.log("Email: ", email)
    console.log("Message: ", message)
    const contact = await contactReq(firstName,lastName,email,message)
    if(contact && contact.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }  
})

app.get("/api/search/:searchName", async (req, res) => {
    const searchName = req.params.searchName
    const src = await searchEng(searchName)
    if(src && src.success){
        res.status(200).json({
            success: true,
            data: src.data
        })
    }
    else{
        res.status(500).json({
            success: false,
            data: null
        })
    }
})

app.get("/api/categorySearch/:category", async (req, res) => {
    const category = req.params.category
    const src = await searchCat(category)
    if(src && src.success){
        res.status(200).json({
            success: true,
            data: src.data
        })
    }
    else{
        res.status(500).json({
            success: false,
            data: null
        })
    }
})

app.get("/api/productSearch/:id", async (req, res) => {
    const id = req.params.id
    console.log("ID: ",id)
    const src = await productDetails(id)
    if(src && src.success){
        res.status(200).json({
            success: true,
            category: src.category,
            productDetails: src.product
        })
    }
    else{
        res.status(500).json({
            success: false,
            category: null
        })
    }
})

app.get("/api/getCart/:token", async (req, res) => {
    const token = req.params.token
    console.log("token: ", token)
    console.log("Payload del token: ", jwt.decode(token));
    const decodedToken = jwt.verify(token, secretKey)
    console.log("decoded token: ", decodedToken)
    const id = decodedToken.id
    console.log("id: ",id)
    const srcBike = await getBikes(id)
    const srcAcc = await getAccessories(id)
    const srcSer = await getServices(id)
    const idCart = await getCart(id)
    console.log("Cart: ", idCart.idcart)
    if((srcBike && srcBike.success) && (srcAcc && srcAcc.success) && (srcSer && srcSer.success)){
        res.status(200).json({
            success: true,
            idCart: idCart.idcart,
            bikes: srcBike.data,
            accessories: srcAcc.data,
            services: srcSer.data
        })
    }
    else{
        res.status(500).json({
            success: false,
            bikes: null,
            accessories: null,
            services: null
        })
    }
})

//nella richiesta di aggiunta al carrello viene ricevuto il token del cliente viene  l'id del prodotto 
//occorre chiamare una funzione che ritorni la categoria del prodotto (categoryName.js) e successivamente si aggiunge il prodotto alla rispettiva tabella
app.post("/api/addProduct", async (req, res) => {
    console.log(req.body)
    const token = req.body.userToken
    const decodedToken = jwt.verify(token, secretKey)
    const idCus = decodedToken.id
    const idProduct = req.body.productID
    console.log("idProduct: " + idProduct)
    console.log("idCustomer: " + idCus)
    const findCart = await getCart(idCus)
    const categoryName = await categoryFinder(idProduct)
    const appProd = await productAdd(findCart.idcart,idProduct, categoryName.category)
    if(appProd && appProd.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }

})

app.get("/api/testSearch", async (req, res) => {

    const test_src = await maxId()
    console.log("MaxId: " + test_src.maxId)
    if(test_src && test_src.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
}) 

app.get('/api/getAddress/:token', async (req, res) => {
    const token = req.params.token
    const decodedToken = jwt.verify(token, secretKey)
    const idCustomer = decodedToken.id
    const getAddressInfo = await getAddress(idCustomer)
    if(getAddressInfo && getAddressInfo.success){
        res.status(200).json({
            success: true,
            email: getAddressInfo.email,
            phone: getAddressInfo.phone,
            address: getAddressInfo.address
        })
    }
    else{
        res.status(500).json({
            success: false,
            email: null,
            phone: null,
            address: null
        })
    }
})

app.post('/api/setAddress', async (req, res) => {
    const decodedToken = jwt.verify(req.body.token, secretKey)
    const idCustomer = decodedToken.id
    const setAddressInfo = updateAddressInfo(idCustomer, req.body.address, req.body.email, req.body.phone)
    if(setAddressInfo && setAddressInfo.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.get('/api/getDetails/:token', async (req, res) => {
    const token = req.params.token
    const decodedToken = jwt.verify(token, secretKey)
    const idCustomer = decodedToken.id
    const detailInfo = await getDetails(idCustomer)
    if(detailInfo && detailInfo.success){
        res.status(200).json({
            success: true,
            firstName: detailInfo.name,
            lastName: detailInfo.surname,
            birthDate: detailInfo.birth
        })
    }
    else{
        res.status(500).json({
            success: false,
            firstName: null,
            lastName: null,
            birthDate: null
        })
    }
})

app.post('/api/setDetails', async (req, res) => {
    const decodedToken = jwt.verify(req.body.token, secretKey)
    const idCustomer = decodedToken.id
    const setDetailInfo = updateDetails(idCustomer, req.body.name, req.body.surname, req.body.birth)
    if(setDetailInfo && setDetailInfo.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.post('/api/setData', async (req, res) => {
    const decodedToken = jwt.verify(req.body.token, secretKey)
    const idCustomer = decodedToken.id
    const setData = updateData(idCustomer, req.body.username, req.body.password)
    if(setData && setData.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.get('/api/getData/:token', async (req, res) => {
    const token = req.params.token
    const decodedToken = jwt.verify(token, secretKey)
    const idCustomer = decodedToken.id
    const data = await getData(idCustomer)
    if(data && data.success){
        res.status(200).json({
            success: true,
            username: data.username,
            password: data.password
        })
    }
    else{
        res.status(500).json({
            success: true,
            username: null,
            password: null
        })
    }
})

app.get('/api/inventory', async (req, res) =>{
    const inventory = await getInventory()
        if(inventory && inventory.success){
            res.status(200).json({
                    success: true,
                    data: inventory.data.oggetti
                })
        }else{
            res.status(500).json({
                success: false,
                data: null
            })
        }
})

app.get('/api/sales', async (req, res) =>{
    const sales = await getSales()
        if(sales && sales.success){
            res.status(200).json({
                    success: true,
                    data: sales.data.oggetti
                })
        }else{
            res.status(500).json({
                success: false,
                data: null
            })
        }
})
    
app.get('/api/shipments', async (req, res) =>{
    const shipments = await getShipments()
        if(shipments && shipments.success){
            res.status(200).json({
                    success: true,
                    data: shipments.data.oggetti
                })
        }else{
            res.status(500).json({
                success: false,
                data: null
            })
        }
})

app.get('/api/employees', async (req, res) =>{
    const employees = await getEmployees()
        if(employees && employees.success){
            res.status(200).json({
                    success: true,
                    data: employees.data.oggetti
                })
        }else{
            res.status(500).json({
                success: false,
                data: null
            })
        }
})

app.post('/api/setEmployee', async (req, res) => {
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        username: req.body.username,
        password: req.body.password
    }
    
    const setEmp = await setEmployees(employee)
    
    if (setEmp && setEmp.success){
        console.log("Employee registration success")
        
        res.status(200).json({
            success: true
        })
    }
    else{
        console.log("Register unsuccessful")
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

app.post('/api/deleteEmployee', async (req, res) => {
    const deleteId = req.body.id
    const deleteEmployee = await del(deleteId)
    if(deleteEmployee && deleteEmployee.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
})

app.get('/api/download', async (req, res) => {
    const report = await createReport()
    const filePath = path.join("./Monthlyreport.pdf")
    const fileName = 'Monthlyreport.pdf'

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`)
    res.setHeader('Content-Type', 'application/octet-stream')

    const fileStream = fs.createReadStream(filePath)
    fileStream.pipe(res)
})

app.post('/api/refund', async (req, res) => {
    const saleId = req.body.id
    const refund = await refundOperation(saleId)
    if(refund && refund.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.post('/api/setBike', async (req, res) => {
    const bike = req.body
    const createBike = await setBike(bike)
    if(createBike && createBike.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.post('/api/setAccessory', async (req, res) => {
    const accessory = req.body
    const createAccessory = await setAccessory(accessory)
    if(createAccessory && createAccessory.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.post('/api/postService', async (req, res) => {
    const service = req.body
    const postService = await setService(service)
    if(postService && postService.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.post('/api/removeBike', async (req, res) => {
    const bikeId = req.body.id
    const remBike = await removeBike(bikeId)
    if(remBike && remBike.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.post('/api/removeAccessory', async (req, res) => {
    const accId = req.body.id
    const remAcc = await removeAccessories(accId)
    if(remAcc && remAcc.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.post('/api/removeService', async (req, res) => {
    const serId = req.body.id
    const remSer = await removeService(serId)
    if(remSer && remSer.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.get('/api/bikeList', async (req, res) =>{
    const bikes = await bikeTable()
        if(bikes && bikes.success){
            res.status(200).json({
                    success: true,
                    data: bikes.data.oggetti
                })
        }else{
            res.status(500).json({
                success: false,
                data: null
            })
        }
})

app.get('/api/accessoryList', async (req, res) =>{
    const accessories = await accessoryTable()
        if(accessories && accessories.success){
            res.status(200).json({
                    success: true,
                    data: accessories.data.oggetti
                })
        }else{
            res.status(500).json({
                success: false,
                data: null
            })
        }
})

app.get('/api/serviceList', async (req, res) =>{
    const services = await serviceTable()
        if(services && services.success){
            res.status(200).json({
                    success: true,
                    data: services.data.oggetti
                })
        }else{
            res.status(500).json({
                success: false,
                data: null
            })
        }
})

app.post('/api/employeesLogin', async (req, res) => {
    const auth = await empLogin(req.body.username, req.body.password)
    if (auth && auth.success){
        console.log("Returning success")
        console.log("User: " + auth.username + " id: " + auth.id)
        const user = {
            id: auth.id,
            user: auth.username
        }
        const token = jwt.sign(user, secretKey, {expiresIn: '5h'})
        console.log("Token: " + token)
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token
        })
    }
    else{
        console.log("Returning failure")
        res.status(401).json({
            success: false,
            message: "Login failed"
        })
    }
})

app.get('/api/getReviews/:idprod', async (req, res) => {
    const idprod = req.params.idprod
    console.log(idprod)
    const getRev = await getReviews(idprod)
    if(getRev && getRev.success){
        res.status(200).json({
            success: true,
            data: getRev.data.oggetti
        })
    }
    else{
        res.status(500).json({
            success: false,
            data: null
        })
    }
})

app.post('/api/setReview', async (req, res) => {
    const decodedToken = jwt.verify(req.body.token, secretKey)
    const idCustomer = decodedToken.id
    const value = req.body.value
    const content = req.body.content
    const product = req.body.codProduct
    const uploadReview = await setReview(idCustomer,value,content,product)
    if(uploadReview && uploadReview.success){
        const updateFeedback = await setFeedBack(product,value)
        if(updateFeedback && updateFeedback.success){
            res.status(200).json({
                success: true
            })
        }
        else{
            res.status(500).json({
                success: false
            })
        }
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.get('/api/checkEmployee/:id', async (req, res) => {
    const idEmployee = req.params.id
    const check = await checkEmployee(idEmployee)
    if(check && check.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.post('/api/removeCard', async (req, res) => {
    const remove = await removeCartItem(req.body.id, req.body.category, req.body.customer)
    if (remove && remove.success){
        res.status(200).json({
            success: true
        })
    }
    else{
        res.status(500).json({
            success: false
        })
    }
})

app.post('/api/increaseBike', async (req, res) => {
    const increase = await addBikeQuantity(req.body.id, req.body.quantity)
    if(increase && increase.success){
        res.status(200).json({success: true})
    }
    else{
        res.status(500).json({success: false})
    }
})

app.post('/api/increaseAccessory', async (req, res) => {
    const increase = await addAccessoryQuantity(req.body.id, req.body.quantity)
    if(increase && increase.success){
        res.status(200).json({success: true})
    }
    else{
        res.status(500).json({success: false})
    }
})

app.post('/api/payment', async (req, res) => {
    console.log(req.body)
    const decodedToken = jwt.verify(req.body.token, secretKey)
    const idCus = decodedToken.id
    const customer = await customerFinder(idCus)
    const purchase = await purchaseDetails(req.body.id, req.body.type)

    try {
      const paymentToken = req.body.paymentToken

      const preAmount = purchase.price * 100
      const amount = parseInt(preAmount) + 1000

      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: paymentToken,
        },
      });
      
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, 
            currency: 'eur', 
            payment_method_types: ['card'],
            payment_method: paymentMethod.id,
            confirm: true, 
        });

        const info = await infoSender(customer, purchase)
        res.status(200).json({ success: true, paymentIntent });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
        }
    });

app.listen(PORT, () => {console.log(`listening on port ${PORT}`)})
