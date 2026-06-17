/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PersonalCard from "./components/personalCard";
import "./cart.css";

function Cart(){
    
    const navigate = useNavigate()
    const params = useParams()
    const [bikes, setBikes] = useState([])
    const [accessories, setAccessories] = useState([])
    const [services, setServices] = useState([])
    const [cartId, setCartId] = useState('')
    
    let shipping = 0
    
    const totalBikes = bikes ? bikes.reduce((acc, item) => acc + parseFloat(item.price), 0) : 0;
    const totalAccessories = accessories ? accessories.reduce((acc, item) => acc + parseFloat(item.price), 0) : 0;
    const totalServices = services ? services.reduce((acc, item) => acc + parseFloat(item.price), 0) : 0;


    let total = totalBikes + totalAccessories + totalServices;
      

    useEffect(() => {
        async function fetchData() {
            try{
                const stringifiedParams = JSON.stringify(params)
                const parsedParams = JSON.parse(stringifiedParams)
                const tkn = parsedParams.token
                console.log("Token from cart URL: " + tkn)

                const response = await fetch(`/api/getCart/${tkn}`)
                if (response.status === 500) {
                    throw new Error("Fetching data failed")
                }
                else{
                    console.log("Request successful")
                }
                const JSONData = await response.json()
                setCartId(JSONData.idCart)
                setBikes(JSONData.bikes?.oggetti || []);
                setAccessories(JSONData.accessories?.oggetti || []);
                setServices(JSONData.services?.oggetti || []);
                
            }catch(err){
                console.log("Error: " + err)
            }
        }

        fetchData()
    }, [])

    function buyProductHandler(event){
        event.preventDefault()
        navigate(`/checkout/${cartId}/cart`)
    }

    function removeItemFromCart(id, category) {

        const updatedBikes = bikes.filter(item => item.id !== id);
        const updatedAccessories = accessories.filter(item => item.id !== id);
        const updatedServices = services.filter(item => item.id !== id);

        setBikes(updatedBikes);
        setAccessories(updatedAccessories);
        setServices(updatedServices);

        const totalBikes = updatedBikes.reduce((acc, item) => acc + parseFloat(item.price), 0);
        const totalAccessories = updatedAccessories.reduce((acc, item) => acc + parseFloat(item.price), 0);
        const totalServices = updatedServices.reduce((acc, item) => acc + parseFloat(item.price), 0);
    
        const newTotal = totalBikes + totalAccessories + totalServices;

        total = newTotal;
    }


    return(
        <div className="personalCart">
            <div className='cartTitle'>
                <h1 className="titleCart">Your Cart</h1>
            </div>
            <div className="cartContainer">
                <div className="productsContainer">
                <h1 className="bicycleTitle">Bicycles</h1>
                <div className="bikesContainer">
                {bikes && bikes.length > 0 ? (
                    bikes.map(item => (
                        <PersonalCard 
                            id={item.id}
                            title={item.name}
                            price={item.price}
                            description={item.desc} 
                            immagine={`data:image/jpeg;base64, ${item.picture}`}
                            category={1}
                            removeItemFromCart={removeItemFromCart}
                        />
                    ))
                ) : (
                    <p className="nodata">No bicycle in the cart.</p>
                )}
                </div>
                    <h1 className="accessoriesTitle">Accessories</h1>
                        <div className="accessoriesContainer">
                        {accessories && accessories.length > 0 ? (
                            accessories.map(item => (
                                <PersonalCard 
                                    id={item.id}
                                    title={item.name}
                                    price={item.price}
                                    description={item.desc} 
                                    immagine={`data:image/jpeg;base64, ${item.picture}`}
                                    category={2}
                                    removeItemFromCart={removeItemFromCart}
                                />
                                ))) : (
                            <p className="nodata">No accessories in the cart.</p>)}
                        </div>
                    <h1 className="servicesTitle">Services</h1>
                    <div className="servicesContainer">
                        {services && services.length > 0 ? (
                            services.map(item => (
                            <PersonalCard 
                                id={item.id}
                                title={item.name}
                                price={item.price}
                                description={item.desc} 
                                immagine={`data:image/jpeg;base64, ${item.picture}`}
                                category={3}
                                removeItemFromCart={removeItemFromCart}
                            />
                            ))
                        ) : (
                            <p className="nodata">No services in the cart.</p>
                        )}
                        </div>
                    </div>
                <div className="productsDetails">
                    <div className="detailTitle">
                        <h1>Summary</h1>
                    </div>
                    <div className="productTable">
                        <table>
                            <tbody>
                            {bikes.map(item => (
                                <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>€{parseFloat(item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                            {accessories.map(item => (
                                <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>€{parseFloat(item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                            {services.map(item => (
                                <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>€{parseFloat(item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                                <tr>
                                    <td>Subtotal</td>
                                    <td>€ {total}
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                                {total > 0 ?(
                                    <tr>
                                    <td>Shipping</td>
                                    <td>€ {shipping + 10}</td>
                                </tr>
                                ): null}
                                
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr className="tot">
                                <tr>
                                    {total > 0 ? (
                                        <>
                                        <td>Total</td>
                                        <td>€{(total + shipping + 10).toFixed(2)}</td>
                                        </>
                                    ) : (
                                        <>
                                        <td>Total</td>
                                        <td>There's nothing in the cart</td>
                                        </>
                                    )}
                                    </tr>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="buttonArea">
                        <div className="check-out">
                            <button className="chkout" onClick={buyProductHandler}>Check-out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;