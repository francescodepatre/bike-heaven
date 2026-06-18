/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import "./style/feedbackList.css";
import Rating from '@mui/material/Rating';

function FeedbackList(){

    const params = useParams()
    const idproduct = params.id
    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try{
                console.log("getting: " + idproduct)
                const response = await fetch(`https://bike-heaven.onrender.com/api/getReviews/${idproduct}`)
                if (response.status === 500) {
                    throw new Error("Fetching data failed")
                }
                const JSONData = await response.json()
                setData(JSONData.data)
                setLoading(false)
            
            }catch(error){
                console.log("Error: " + error)
            }
        }
        fetchData()
    },[])
    return (
        <div className="feedbackList">
            <div className="feedbackListContainer">
                {data ? (
                    data.map(item => (
                        <div className="singleFeedback">
                            <div className="feedbackTitle">
                                <h3>{item.firstname} {item.lastname}</h3>
                            </div>
                            <div className="feedbackRating">
                                <Rating name="half-rating-read" defaultValue={item.value} precision={0.5} readOnly />
                            </div>
                            <div className="feedbackTextContent">
                                <p>{item.content}</p>
                            </div>
                        </div>  
                    ))
                ): loading? (
                    <p className='RatingsTemp'>No reviews for this product</p>
                ) : (
                    <p className='RatingsTemp'>No data available</p>
                )}
            </div>
        </div>
    );
}

export default FeedbackList;
