/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardActionArea } from '@mui/material';
import './style/card_new.css';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function PersonalCard({id, title, price, description, immagine, category, removeItemFromCart}){

    const navigate = useNavigate()
    const idProd = id
    const cat = category
    const token = localStorage.getItem('token')
    const decoded = jwt_decode(token)
    const idCustomer = decoded.id

    function handleClick(event){
        event.preventDefault()
        navigate(`/product/${id}`)
    }

    function handleRemove(e){
        e.preventDefault()

        if (window.confirm("Are you sure you want to remove this product from your cart?")) {
            removeItemFromCart(id, category);
            let cartItem = {
                id: idProd,
                category: cat,
                customer: idCustomer
            }
            fetch('https://bike-heaven.onrender.com/api/removeCard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItem)
            }).then(response => response.json()).then(data => {
                if(data.success){
                    console.log("Card deleted successfully")
                }
                else{
                    console.log("Attention: card not deleted")
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
    return(
        <div className="cardContainer">
        <Card className="singleCard">
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component="img"
                    height="140"
                    image={immagine}
                    alt="BikeHeaven®"
                    />
                    <CardContent>
                        <Typography gutterBottom className="ellipsis" variant="h5" component="div">
                            {title} 
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div">
                            € {price}
                        </Typography>
                        <Typography className="ellipsis" variant="body2" color="text.secondary">
                            {description}
                    </Typography>
                </CardContent>
            </CardActionArea>  
            <CardActions>
                <Button size="small" onClick={handleRemove}>Remove</Button>
            </CardActions>        
        </Card>
        </div>
    );
}

export default PersonalCard;