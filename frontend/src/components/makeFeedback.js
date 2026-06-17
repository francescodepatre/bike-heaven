/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import jwt_decode from "jwt-decode";
import React, {useState} from 'react';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import "./makeFeedback.css"

const MakeFeedback = () => {

    const params = useParams()
    const idproduct = params.id
    const [value, setValue] = useState("")
    const [content, setContent] = useState("")
    const [product, setProduct] = useState("")


    const handleForm = (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token")
        if(token){
          try{
            const decodedToken = jwt_decode(token);
                    const expirationDate = new Date(decodedToken.exp * 1000);
                    if(expirationDate > new Date()){
                      let reviewData = {
                        token: localStorage.getItem("token"),
                        value: value,
                        content: content,
                        codProduct: idproduct
                      }
                      fetch('/api/setReview', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(reviewData)
                      }).then(response => response.json()).then(data => {
                        if(data.success){
                            alert('Thank you for letting us know your opinion!')
                            window.location.reload()
                        }
                        else{
                            alert("Attention: Something went wrong!")
                        }
                      }).catch(error => {
                        console.log(error)
                      })
                    }
                    else{
                        alert("Your token is expired. Please log in.")
                    }
          }
          catch(error){
            console.error("Error: ", error)
          }
        }
        else{
          alert("Please log in.")
        }
        
      }

    return (
        <div className="feedbackMaker">
            <div className="publishReviewContainer">
                <div className="reviewTitle">
                    <h2>Leave a review</h2>
                </div>
                <div className="reviewRating">
                    <Rating name="half-rating" defaultValue={0} precision={0.5} onChange={(e) => setValue(e.target.value)}/>
                </div>
                <div className="reviewDescription">
                    <TextField id="outlined-multiline-static" label="Review" multiline rows={10} className="custom-textfield" onChange={(e) => setContent(e.target.value)}/>
                </div>
                <div className="publishButton">
                    <Button variant="outlined" onClick={handleForm}>Publish</Button>
                </div>
            </div>
        </div>
    );
}

export default MakeFeedback;
