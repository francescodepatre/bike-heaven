/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import "./style/product_page.css";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import FeedbackList from "./feedbackList";
import MakeFeedback from "./makeFeedback";

function ProductPage(){

    const params = useParams()
    const param_id = params.id
    const navigate = useNavigate()
    const prodotto_id = parseInt(params.id, 10);
    let availabilityString

    const [category, setCategory] = useState("")
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
                console.log("Passing: " + param_id)
                const response = await fetch(`https://bike-heaven.onrender.com/api/productSearch/${param_id}`)
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
                setCategory(JSONData.category)
                
            }catch(err){
                console.log("Error: ", err)

            }
        }

        fetchData()
        
    }, [])

    function addProductHandler(event){
        event.preventDefault()
        if(quantity > 0 || category === "Services"){
            const token = localStorage.getItem("token")
            if(token){
                try{
                    const decodedToken = jwt_decode(token);
                    const expirationDate = new Date(decodedToken.exp * 1000);
                    if (expirationDate > new Date()){
                        let requestData = {
                            userToken: localStorage.getItem("token"),
                            productID: param_id
                        }
                        fetch("https://bike-heaven.onrender.com/api/addProduct", {
                            method: "POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify(requestData)
                        }).then(response => response.json()).then(data => {
                            if(data.success){
                                alert("Product successfully added to your chart")
                            }
                            else{
                                alert("Error: Product not added to your chart")
                            }
                        }).catch(error => {
                
                        })
                    }
                    else{
                        alert("Your token is expired. Please log in.")
                    }
                }catch(error){
                    console.error("Error: ", error)
                }
                
            }else{
                alert("Please log in.")
            }
        }
        else{
            console.log("Category: " + category)
            alert("We are sorry but this product is not available.")
            }
    }

    function buyProductHandler(event){
        event.preventDefault()
        if(quantity > 0){
            const token = localStorage.getItem("token")
            if(token){
                try{
                    const decodedToken = jwt_decode(token);
                    const expirationDate = new Date(decodedToken.exp * 1000);
                    if(expirationDate > new Date()){
                        navigate(`/checkout/${param_id}/single`)
                    }
                    else{
                        alert("Your token is expired. Please log in.")
                    }
                }catch(error){
                    console.error("Error: ", error)
                }
            }else{
                alert("Please log in.")
                }
        }
        else{
            alert("We are sorry but this product is not available.")
        }        
    }
      

    if(quantity > 10 || category === "Services"){
        availabilityString = <h4 className="av">Available</h4>
    }
    else if(quantity < 10 && quantity > 0){
        availabilityString = <h4 className="few">Few left</h4>
    }
    else{
        availabilityString = <h4 className="sold">Sold out</h4>
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
                        <Rating name="read-only" value={feedback} readOnly precision={0.5}/>
                    </div>
                    <div className="productSpecs">
                        { category === "Road Bicycles" || category === "Mountain Bikes" || category === "City Bikes" || category === "E-bikes" || category === "Bikes for Kids" ? (
                            <div>
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
                                            <td className="TableData">Weight</td>
                                            <td className="BikeData">{weight} Kg</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        ):(
                            <div>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="TableData">Brand</td>
                                            <td className="BikeData">{brand}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        
                    </div>
                    <div className="productAvailability">
                        {availabilityString}
                    </div>
                </div>
            </div>
            <div className="actionMenu">
                <div className="addCart">
                    <button className="addBtn" onClick={addProductHandler}>Add To Cart</button>
                </div>
                <div className="Buy">
                        <button className="buyBtn" onClick={buyProductHandler}>Buy Now</button>
                </div>
            </div>
            <div className="feedbacks">
                <div className="feedbackListTitle">
                    <h1>Product Reviews</h1>
                </div>
                <FeedbackList />
                <MakeFeedback />
            </div>
        </div>
    );
}

export default ProductPage;