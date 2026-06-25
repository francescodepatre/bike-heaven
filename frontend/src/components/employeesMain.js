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
    <div className="workInterface">
        <div className="sidePanel">

        <div className="sidePanel-logo">
            <span className="sidePanel-logo-dot" />
            <span className="sidePanel-logo-name">Bike Heaven</span>
            <span className="sidePanel-logo-sub">Employee portal</span>
        </div>

        <ul className="sideMenu">
            <li className="menuSection">Gestione</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<Inventory />)}>Inventario</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<Orders />)}>Ordini</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<Shipments />)}>Spedizioni</li>

            <li className="menuSection">Dipendenti</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<Employees />)}>Lista dipendenti</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<EmployeeRegistration />)}>Aggiungi dipendente</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<RemoveEmployee />)}>Rimuovi dipendente</li>

            <li className="menuSection">Catalogo</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<AddBike />)}>Aggiungi bici</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<AddAccessory />)}>Aggiungi accessorio</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<AddService />)}>Aggiungi servizio</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<RemoveBike />)}>Rimuovi bici</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<RemoveAccessories />)}>Rimuovi accessorio</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<RemoveService />)}>Rimuovi servizio</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<BikeList />)}>Lista bici</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<AccessoryList />)}>Lista accessori</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<ServiceList />)}>Lista servizi</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<AddBikeQuantity />)}>Aumenta qtà bici</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<AddAccessoryQuantity />)}>Aumenta qtà accessori</li>

            <li className="menuSection">Report</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<MonthlyReport />)}>Report mensile</li>
            <li className="menuItem" onClick={() => handleMenuItemClick(<Refund />)}>Rimborsi</li>
        </ul>

        <div className="sidePanel-user">
            <div className="sidePanel-user-pill">
            <div className="sidePanel-avatar">FD</div>
            <div>
                <div className="sidePanel-user-name">F. De Patre</div>
                <div className="sidePanel-user-role">Amministratore</div>
            </div>
            </div>
        </div>
        </div>

        <div className="contentContainer">
        {currentComponent}
        </div>
    </div>
    );
}

export default EmployeesMain;
