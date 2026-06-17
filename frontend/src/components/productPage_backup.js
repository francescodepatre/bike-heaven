/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from "react";
import "./product_page.css";
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function ProductPage(id){

    const params = useParams()
    const param_id = params.id

    let availabilityString

    const [titleProduct, setTitleProduct] = useState("")
    const [price, setPrice] = useState("")
    const [brand, setBrand] = useState("")
    const [telaio, setTelaio] = useState("")
    const [dimensions, setDimensions] = useState("")
    const [gear, setGear] = useState("")
    const [brakes, setBrakes] = useState("")
    const [sosp, setSosp] = useState("")
    const [weight, setWeight] = useState("")
    const [feedback, setFeedback] = useState("") 
    const [quantity, setQuantity] = useState("")
    const [picture, setPicture] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`/api/productSearch/${param_id}`)
                console.log(response.status)
                if (response.status === 500) {
                    throw new Error("Fetching data failed")
                }

                const JSONData = await response.json()
                setTitleProduct(JSONData.productDetails.name)
                setPrice(JSONData.productDetails.price)
                setBrand(JSONData.productDetails.brand)
                setTelaio(JSONData.productDetails.frame)
                setDimensions(JSONData.productDetails.dimensions)
                setGear(JSONData.productDetails.gear)
                setBrakes(JSONData.productDetails.brakes)
                setSosp(JSONData.productDetails.suspensions)
                setWeight(JSONData.productDetails.weight)
                setPicture(JSONData.productDetails.picture)
                setQuantity(JSONData.productDetails.quantity)
                setFeedback(JSONData.productDetails.feedback)
                setDescription(JSONData.productDetails.description)
                
            }catch(err){
                console.log("Error: ", err)

            }
        }

        fetchData()
        
    }, [])

    

    if(quantity > 10){
        availabilityString = <h4 className="av">Available</h4>;
    }
    else if(quantity < 10 && quantity > 0){
        availabilityString = <h4 className="few">Few left</h4>;
    }
    else{
        availabilityString = <h4 className="sold">Sold out</h4>;
    }
    
    return(
        <div className="productContainer">
            <div className="productPage">
                <div className="productImage">
                    <img src={`data:image/jpeg;base64, ${picture}`} alt="By BikeHeaven®" /> 
                </div>
                <div className="productContent">
                    <div className="productTitle">
                        <h1 className="Title">{titleProduct}</h1>
                        <p className="SellerInfo">{brand}</p>
                    </div>
                    <div className="productPrice">
                        <h1 className="Price">€ {price}</h1>
                    </div>
                    <div className="productDescription">
                        <p className="Description">
                            {description}
                        </p>
                    </div>
                    <div className="productRatings">
                        <Typography component="legend">Product Feedback</Typography>
                        <Rating name="read-only" value={feedback} readOnly />
                    </div>
                    <div className="productSpecs">
                        <table>
                            <tbody>
                                <tr>
                                    <td className="TableData">Brand</td>
                                    <td className="BikeData">{brand}</td>
                                </tr>
                                <tr>
                                    <td className="TableData">Frame</td>
                                    <td className="BikeData">{telaio}</td>
                                </tr>
                                <tr>
                                    <td className="TableData">Dimensions</td>
                                    <td className="BikeData">{dimensions} cm</td>
                                </tr>
                                <tr>
                                    <td className="TableData">Gear</td>
                                    <td className="BikeData">{gear}</td>
                                </tr>
                                <tr>
                                    <td className="TableData">Brakes</td>
                                    <td className="BikeData">{brakes}</td>
                                </tr>
                                <tr>
                                    <td className="TableData">Suspensions</td>
                                    <td className="BikeData">{sosp}</td>
                                </tr>
                                <tr>
                                    <td className="TableData">Peso</td>
                                    <td className="BikeData">{weight} Kg</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="productAvailability">
                        {availabilityString}
                    </div>
                </div>
            </div>
            <div className="actionMenu">
                <div className="addCart">
                    <button className="addBtn">Add To Cart</button>
                </div>
                <div className="Buy">
                    <button className="buyBtn" >Buy Now</button>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;