/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from "react";
import "./style/product_page.css";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

function bikeDisplay(id, titleProduct, price, description, feedback, brand, telaio , dimensions, gear, brakes, sosp, weight, quantity, picture){

    let availabilityString

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

export default bikeDisplay