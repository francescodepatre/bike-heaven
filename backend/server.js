/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000
const secretKey = process.env.JWT_SECRET
const stripe = require('stripe')(process.env.STRIPE_SECRET)

// Modules
const loginOperation        = require('./login_operation')
const registerOperation     = require('./registration_operation')
const homeReq               = require('./home_last')
const contactReq            = require('./contact_request')
const searchEng             = require('./search')
const searchCat             = require('./searchCategory')
const productDetails        = require('./prodSrc')
const categoryFinder        = require('./categoryName')
const getBikesCart          = require('./bikeCart')
const getAccessoriesCart    = require('./accessoryCart')
const getServicesCart       = require('./serviceCart')
const productAdd            = require('./productAdder')
const getCart               = require('./getCartByID')
const cartCreator           = require('./cartCreator')
const maxId                 = require('./maxId')
const customerFinder        = require('./findCustomer')
const infoSender            = require('./payInfoSender')
const purchaseDetails       = require('./getPurchaseDetails')
const getDetails            = require('./getDetails')
const getAddress            = require('./getAddress')
const getData               = require('./getData')
const updateAddressInfo     = require('./setAddress')
const updateDetails         = require('./setDetails')
const updateData            = require('./setData')
const getInventory          = require('./getInventory')
const getSales              = require('./getSales')
const getShipments          = require('./getShipments')
const getEmployees          = require('./getEmployees')
const setEmployees          = require('./employeeRegistration')
const delEmployee           = require('./deleteEmployee')
const createReport          = require('./createReport')
const refundOperation       = require('./refundOperation')
const setBike               = require('./setBike')
const setAccessory          = require('./setAccessory')
const setService            = require('./setService')
const removeBike            = require('./deleteBike')
const removeAccessories     = require('./deleteAccessory')
const removeService         = require('./deleteService')
const bikeTable             = require('./bikeTable')
const accessoryTable        = require('./accessoryTable')
const serviceTable          = require('./serviceTable')
const empLogin              = require('./employeesLoginOperation')
const getReviews            = require('./getReviews')
const setFeedBack           = require('./setFeedBack')
const setReview             = require('./setReview')
const checkEmployee         = require('./checkEmployee')
const removeCartItem        = require('./removeCartItem')
const addBikeQuantity       = require('./addBikeQ')
const addAccessoryQuantity  = require('./addAccessoryQ')

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors({ origin: process.env.CORS_ORIGIN || 'https://francescodepatre.github.io' }))

app.post('/api/register', async (req, res) => {
    const profile = {
        firstName: req.body.firstName,
        lastName:  req.body.lastName,
        birthDate: req.body.birthDate,
        email:     req.body.email,
        phone:     req.body.phone,
        address:   req.body.address,
        username:  req.body.username,
        password:  req.body.password
    }
    const reg = await registerOperation(profile)
    if (reg && reg.success) {
        const user_reg = { id: reg.id, user: reg.username }
        const token = jwt.sign(user_reg, secretKey, { expiresIn: '5h' })
        await cartCreator(reg.id)
        return res.status(200).json({ success: true, token })
    }
    res.status(500).json({ success: false, message: 'Internal server error' })
})

app.post('/api/login', async (req, res) => {
    const auth = await loginOperation(req.body.username, req.body.password)
    if (auth && auth.success) {
        const user = { id: auth.id, user: auth.username }
        const token = jwt.sign(user, secretKey, { expiresIn: '5h' })
        return res.status(200).json({ success: true, message: 'Login successful', token })
    }
    res.status(401).json({ success: false, message: 'Login failed' })
})

app.post('/api/employeesLogin', async (req, res) => {
    const auth = await empLogin(req.body.username, req.body.password)
    if (auth && auth.success) {
        const user = { id: auth.id, user: auth.username }
        const token = jwt.sign(user, secretKey, { expiresIn: '5h' })
        return res.status(200).json({ success: true, message: 'Login successful', token })
    }
    res.status(401).json({ success: false, message: 'Login failed' })
})

app.get('/api/home', async (req, res) => {
    const home = await homeReq()
    if (home && home.success)
        return res.status(200).json({ success: true, data: home.data })
    res.status(500).json({ success: false, data: null })
})

app.post('/api/contact', async (req, res) => {
    const { firstName, lastName, email, message } = req.body
    const contact = await contactReq(firstName, lastName, email, message)
    if (contact && contact.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.get('/api/search/:searchName', async (req, res) => {
    const src = await searchEng(req.params.searchName)
    if (src && src.success)
        return res.status(200).json({ success: true, data: src.data })
    res.status(500).json({ success: false, data: null })
})

app.get('/api/categorySearch/:category', async (req, res) => {
    const src = await searchCat(req.params.category)
    if (src && src.success)
        return res.status(200).json({ success: true, data: src.data })
    res.status(500).json({ success: false, data: null })
})

app.get('/api/productSearch/:id', async (req, res) => {
    const src = await productDetails(req.params.id)
    if (src && src.success)
        return res.status(200).json({ success: true, category: src.category, productDetails: src.product })
    res.status(500).json({ success: false, category: null })
})

app.get('/api/getReviews/:idprod', async (req, res) => {
    const getRev = await getReviews(req.params.idprod)
    if (getRev && getRev.success)
        return res.status(200).json({ success: true, data: getRev.data.oggetti })
    res.status(500).json({ success: false, data: null })
})

app.get('/api/getCart/:token', async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, secretKey)
        const id = decoded.id
        const [srcBike, srcAcc, srcSer, idCart] = await Promise.all([
            getBikesCart(id),
            getAccessoriesCart(id),
            getServicesCart(id),
            getCart(id)
        ])
        if (srcBike.success && srcAcc.success && srcSer.success)
            return res.status(200).json({
                success: true,
                idCart: idCart.idcart,
                bikes: srcBike.data,
                accessories: srcAcc.data,
                services: srcSer.data
            })
        res.status(500).json({ success: false, bikes: null, accessories: null, services: null })
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid token' })
    }
})

app.post('/api/addProduct', async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.userToken, secretKey)
        const idCus = decoded.id
        const idProduct = req.body.productID
        const findCart = await getCart(idCus)
        const categoryName = await categoryFinder(idProduct)
        const appProd = await productAdd(findCart.idcart, idProduct, categoryName.category)
        if (appProd && appProd.success)
            return res.status(200).json({ success: true })
        res.status(500).json({ success: false })
    } catch (err) {
        res.status(401).json({ success: false, message: 'Invalid token' })
    }
})

app.post('/api/removeCard', async (req, res) => {
    const remove = await removeCartItem(req.body.id, req.body.category, req.body.customer)
    if (remove && remove.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.get('/api/getAddress/:token', async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, secretKey)
        const info = await getAddress(decoded.id)
        if (info && info.success)
            return res.status(200).json({ success: true, email: info.email, phone: info.phone, address: info.address })
        res.status(500).json({ success: false, email: null, phone: null, address: null })
    } catch { res.status(401).json({ success: false }) }
})

app.post('/api/setAddress', async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, secretKey)
        const result = await updateAddressInfo(decoded.id, req.body.address, req.body.email, req.body.phone)
        if (result && result.success)
            return res.status(200).json({ success: true })
        res.status(500).json({ success: false })
    } catch { res.status(401).json({ success: false }) }
})

app.get('/api/getDetails/:token', async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, secretKey)
        const info = await getDetails(decoded.id)
        if (info && info.success)
            return res.status(200).json({ success: true, firstName: info.name, lastName: info.surname, birthDate: info.birth })
        res.status(500).json({ success: false, firstName: null, lastName: null, birthDate: null })
    } catch { res.status(401).json({ success: false }) }
})

app.post('/api/setDetails', async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, secretKey)
        const result = await updateDetails(decoded.id, req.body.name, req.body.surname, req.body.birth)
        if (result && result.success)
            return res.status(200).json({ success: true })
        res.status(500).json({ success: false })
    } catch { res.status(401).json({ success: false }) }
})

app.get('/api/getData/:token', async (req, res) => {
    try {
        const decoded = jwt.verify(req.params.token, secretKey)
        const data = await getData(decoded.id)
        if (data && data.success)
            return res.status(200).json({ success: true, username: data.username, password: data.password })
        res.status(500).json({ success: false, username: null, password: null })
    } catch { res.status(401).json({ success: false }) }
})

app.post('/api/setData', async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, secretKey)
        const result = await updateData(decoded.id, req.body.username, req.body.password)
        if (result && result.success)
            return res.status(200).json({ success: true })
        res.status(500).json({ success: false })
    } catch { res.status(401).json({ success: false }) }
})

app.post('/api/setReview', async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, secretKey)
        const uploadReview = await setReview(decoded.id, req.body.value, req.body.content, req.body.codProduct)
        if (uploadReview && uploadReview.success) {
            const updateFeedback = await setFeedBack(req.body.codProduct, req.body.value)
            if (updateFeedback && updateFeedback.success)
                return res.status(200).json({ success: true })
        }
        res.status(500).json({ success: false })
    } catch { res.status(401).json({ success: false }) }
})

app.post('/api/payment', async (req, res) => {
    try {
        const decoded = jwt.verify(req.body.token, secretKey)
        const customer = await customerFinder(decoded.id)
        const purchase = await purchaseDetails(req.body.id, req.body.type)
        const paymentToken = req.body.paymentToken
        const amount = parseInt(purchase.price * 100) + 1000
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: { token: paymentToken }
        })
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            payment_method_types: ['card'],
            payment_method: paymentMethod.id,
            confirm: true
        })
        await infoSender(customer, purchase)
        res.status(200).json({ success: true, paymentIntent })
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, error: error.message })
    }
})

app.get('/api/inventory', async (req, res) => {
    const inventory = await getInventory()
    if (inventory && inventory.success)
        return res.status(200).json({ success: true, data: inventory.data.oggetti })
    res.status(500).json({ success: false, data: null })
})

app.get('/api/sales', async (req, res) => {
    const sales = await getSales()
    if (sales && sales.success)
        return res.status(200).json({ success: true, data: sales.data.oggetti })
    res.status(500).json({ success: false, data: null })
})

app.get('/api/shipments', async (req, res) => {
    const shipments = await getShipments()
    if (shipments && shipments.success)
        return res.status(200).json({ success: true, data: shipments.data.oggetti })
    res.status(500).json({ success: false, data: null })
})

app.get('/api/employees', async (req, res) => {
    const employees = await getEmployees()
    if (employees && employees.success)
        return res.status(200).json({ success: true, data: employees.data.oggetti })
    res.status(500).json({ success: false, data: null })
})

app.post('/api/setEmployee', async (req, res) => {
    const employee = {
        firstName: req.body.firstName, lastName: req.body.lastName,
        birthDate: req.body.birthDate, email: req.body.email,
        phone: req.body.phone,         address: req.body.address,
        username: req.body.username,   password: req.body.password
    }
    const setEmp = await setEmployees(employee)
    if (setEmp && setEmp.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false, message: 'Internal server error' })
})

app.post('/api/deleteEmployee', async (req, res) => {
    const result = await delEmployee(req.body.id)
    if (result && result.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false, message: 'Internal server error' })
})

app.get('/api/checkEmployee/:id', async (req, res) => {
    const check = await checkEmployee(req.params.id)
    if (check && check.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.get('/api/bikeList', async (req, res) => {
    const bikes = await bikeTable()
    if (bikes && bikes.success)
        return res.status(200).json({ success: true, data: bikes.data.oggetti })
    res.status(500).json({ success: false, data: null })
})

app.get('/api/accessoryList', async (req, res) => {
    const accessories = await accessoryTable()
    if (accessories && accessories.success)
        return res.status(200).json({ success: true, data: accessories.data.oggetti })
    res.status(500).json({ success: false, data: null })
})

app.get('/api/serviceList', async (req, res) => {
    const services = await serviceTable()
    if (services && services.success)
        return res.status(200).json({ success: true, data: services.data.oggetti })
    res.status(500).json({ success: false, data: null })
})

app.post('/api/setBike', async (req, res) => {
    const createBike = await setBike(req.body)
    if (createBike && createBike.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.post('/api/setAccessory', async (req, res) => {
    const createAcc = await setAccessory(req.body)
    if (createAcc && createAcc.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.post('/api/postService', async (req, res) => {
    const postSer = await setService(req.body)
    if (postSer && postSer.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.post('/api/removeBike', async (req, res) => {
    const result = await removeBike(req.body.id)
    if (result && result.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.post('/api/removeAccessory', async (req, res) => {
    const result = await removeAccessories(req.body.id)
    if (result && result.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.post('/api/removeService', async (req, res) => {
    const result = await removeService(req.body.id)
    if (result && result.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.post('/api/increaseBike', async (req, res) => {
    const result = await addBikeQuantity(req.body.id, req.body.quantity)
    if (result && result.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.post('/api/increaseAccessory', async (req, res) => {
    const result = await addAccessoryQuantity(req.body.id, req.body.quantity)
    if (result && result.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.post('/api/refund', async (req, res) => {
    const result = await refundOperation(req.body.id)
    if (result && result.success)
        return res.status(200).json({ success: true })
    res.status(500).json({ success: false })
})

app.get('/api/download', async (req, res) => {
    await createReport()
    const filePath = path.join('./Monthlyreport.pdf')
    res.setHeader('Content-Disposition', 'attachment; filename="Monthlyreport.pdf"')
    res.setHeader('Content-Type', 'application/pdf')
    fs.createReadStream(filePath).pipe(res)
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))