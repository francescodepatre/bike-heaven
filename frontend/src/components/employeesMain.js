/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import Inventory from './inventory';
import Orders from './orders';
import Shipments from './shipments';
import Employees from './employees';
import EmployeeRegistration from './employeeRegistration';
import RemoveEmployee from './removeEmployee';
import MonthlyReport from './monthlyReport';
import Refund from './refund';
import AddBike from './addBike';
import AddAccessory from './addAccessory';
import AddService from './addService';
import RemoveBike from './removeBike';
import RemoveAccessories from './removeAccessories';
import RemoveService from './removeService';
import BikeList from './bikeList';
import AccessoryList from './accessoryList';
import ServiceList from './serviceList';
import AddAccessoryQuantity from './addAccessoryQuantity';
import AddBikeQuantity from './addBikeQuantity';
import "./style/employeesMain.css"

const EmployeesMain = () => {

    const [currentComponent, setCurrentComponent] = useState(null);
    const navigate = useNavigate()

    const handleMenuItemClick = (component) => {
        setCurrentComponent(component);
    };

    useEffect(() => {
        async function fetchData(){
            const token = localStorage.getItem("token")
            if(token){
                try{
                    const decodedToken = jwt_decode(token);
                    const expirationDate = new Date(decodedToken.exp * 1000);
                    if (expirationDate > new Date()){
                        try{
                            const response = await fetch(`https://bike-heaven.onrender.com/api/getReviews/${decodedToken.id}`)
                            if (response.status === 500) {
                                throw new Error("Fetching data failed")
                                navigate("/")
                            }
                            else{
                                if(response.json.success){
                                    return
                                }
                                else{
                                    navigate("/")
                                }
                            }
                        }catch(err){
                            console.log("Error: " + err)
                        }
                    }
                    else{
                        navigate("/")
                    }
                }catch(error){
                    console.error("Error: ", error)
                }
            }else{
                navigate("/")
            }
        }
        fetchData()
    }, []);
    return (
        <div className='workInterface'>
            <div className='sidePanel'>
                <ul className='sideMenu'>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<Inventory />)}>Inventory</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<Orders />)}>Order List</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<Shipments />)}>Shipments</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<Employees />)}>Employee list</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<EmployeeRegistration />)}>Add new employee</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<RemoveEmployee />)}>Remove employee</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<MonthlyReport />)}>Monthly reports section</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<Refund />)}>Returns and refunds management</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AddBike />)}>Add a Bike</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AddAccessory />)}>Add an Accessory</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AddService />)}>Add a Service</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<RemoveBike />)}>Remove a Bike</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<RemoveAccessories />)}>Remove an Accessory</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<RemoveService />)}>Remove a Service</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<BikeList />)}>Bike List</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AccessoryList />)}>Accessory List</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<ServiceList />)}>Service List</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AddAccessoryQuantity />)}>Increase Accessory Quantity</li>
                    <li className='menuItem' onClick={() => handleMenuItemClick(<AddBikeQuantity />)}>Increase Bike Quantity</li>
                </ul>
            </div>
            <div className='contentContainer'>
                {currentComponent}
            </div>
        </div>
    );
}

export default EmployeesMain;
