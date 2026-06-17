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
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './card_new.css';
import { useNavigate } from 'react-router-dom';

function CardNew({id, title, price, description, immagine}){

    const navigate = useNavigate()

    function handleClick(event){
        navigate(`/product/${id}`)
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
        </Card>
        </div>
    );
}

export default CardNew;