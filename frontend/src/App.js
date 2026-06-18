/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useRef, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import NavBar from './components/navBar';
import Main_page from './components/main';
import './App.css';
import Login from './components/login';
import ShopMenu from './components/shopmenu';
import Registration from './components/registration';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Results from './components/results';
import ProductPage from './components/product_page';
import Cart from './cart';
import Checkout from './checkout';
import PaymentForm from './components/paymentTest';
import AccountPage from './components/accountPage';
import EmployeesMain from './components/employeesMain';
import EmployeesLogin from './components/employeesLogin';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      const decoded = jwt_decode(token)
      setUser(decoded)
      setIsLoggedIn(true) 
    }
  }, [])  

  //
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path='/employeesLogin' element={<EmployeesLogin />} />
          <Route path='/employees' element={<EmployeesMain /> } />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/checkout/:id/:type" element={<Checkout />} />
          <Route path="/cart/:token" element={<Cart />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/results/:searchID" element={<Results />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Main_page />} />
          <Route path="/lalala" element={<Main_page />} />
          <Route path="/shop" element={<ShopMenu />} />
        </Routes>
        </div>
    </Router>
    
  );
}

export default App;
