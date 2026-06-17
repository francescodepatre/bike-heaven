/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
    https://www.youtube.com/watch?v=DfqZhItEK-U
*/
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import bikeTrailer from './bike_heaven.mp4';
//import aboutVideo from './abus.mp4';
import './main.css';
import CardNew from './card_new';
import Twitter from './twitter_icon.png';
import Instagram from './instagram_icon.png';
import YouTube from './youtube_icon.png';

function Main_page(){

    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch("/api/home");

                if (response.status === 500) {
                    throw new Error("Fetching data failed");
                }

                const JSONData = await response.json();
                setData(JSONData.data.oggetti);
                console.log(data);
                console.log(loading);
                setLoading(false);
            
            }catch(err){
                console.log("Error: ", err)
                setLoading(false)
            }
        }

        fetchData()
        
    },[])

    function handleForm(event){
        event.preventDefault()
        let mailData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        }
        fetch("api/contact", {
            method: "POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(mailData)
        }).then(response => response.json()).then(data => {
            alert("Thank you for contacting us for assistance. We are here to help you and will do our best to answer your questions and solve any problems you may have.")
            navigate("/")
        })

    }
    
    return(
        <div className="main_containers">
            <div className="first_container">
                <div className="title_container">
                    <h1 id="title">Welcome to Bike Heaven</h1>
                    <h3 id="subtitle">Where Cycling Science meets Adventure.</h3>
                    <div id="visit_shop">
                         <a id="shop_button" href="/shop">
                            Shop
                        </a>
                    </div>
                   
                </div>
                <iframe
                    id="video"
                    src="https://www.youtube.com/embed/IPyYIysw4Zw?autoplay=1&mute=1&loop=1&playlist=IPyYIysw4Zw&controls=0&modestbranding=1&rel=0"
                    title="Bike Trailer"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                />
            </div>
            <div className="second_container">
                <h1 id="second_title">Last Bike Models</h1>
                <div className='Cards_container'>
                    {data ? (
                        data.map(item => (
                            <CardNew 
                            id={item.id}
                            title={item.name}
                            price={item.price}
                            description={item.desc} 
                            immagine={`data:image/jpeg;base64, ${item.picture}`}
                            />
                        ))
                    ):(
                        <p>Nessun Dato Disponibile</p>
                    )}
                </div>
            </div>
            <div className="third_container" id="about_container">
                <div className="about">
                    <h1 id="about_title">About Us </h1>
                    <p id="about_subtitle">
                    Welcome to Bike Heaven, the ultimate destination for bicycle enthusiasts! <br></br> 
                    We are a passionate e-commerce platform dedicated to providing cyclists of all levels with everything they need to fully enjoy their riding experience.<br></br>
                    <br></br>
                    From high-quality accessories and components to renowned bike brands, we strive to offer a wide selection of products that cater to every cyclist's needs. <br></br>
                    Whether you're a urban rider in search of a stylish and functional bike for your daily commute or an adventurous cyclist looking for the perfect gear to tackle challenging trails, Bike Heaven has got you covered. <br></br>

                    Our mission is to make the purchase of cycling products a seamless, secure, and exciting experience. <br></br>
                    With our user-friendly website and intuitive navigation, you can easily find what you're looking for. <br></br>
                    We also provide detailed product information and user reviews to help you make informed decisions. <br></br>
                    </p>
                </div>
                <iframe
                        id="video"
                        src="https://www.youtube.com/embed/DfqZhItEK-U?autoplay=1&mute=1&loop=1&playlist=DfqZhItEK-U&controls=0&modestbranding=1&rel=0&showinfo=0"
                        title="Bike Trailer"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
            </div>
            <div className="fourth_container" id="contact_container">
                <div className="left_container">
                    <h1 className="left_title">Follow Us</h1>
                    <div className="social_buttons">
                        <div className="buttons_container">
                            <a id="twitter_button" href="https://twitter.com/bikeheaven_?s=21&t=gWAZRenKIUUZES44W8rUUg">
                                <img src={Twitter} alt="twitter"/>
                            </a>
                            <a id="instagram_button" href="https://www.instagram.com/bikeheaven.business/">
                                <img src={Instagram} alt="instagram"/>
                            </a>
                            <a id="youtube_button" href="https://www.youtube.com/channel/UC4WQZ6RHLaklIzQh2Wlu2ig">
                                <img src={YouTube} alt="youtube"/>
                            </a>
                        </div>
                    </div>
                    <p id="bottom_info">Via Borgo Rodolfo Tanzi 30/1, 43125, Parma (PR)</p>
                    <p id="authorInfo">Made by: Francesco De Patre</p>
                </div>
                <div className="right_container">
                    <h1 className="right_title">Contact Us</h1>
                    <div className="contact_us_container" >
                        <h3 className="cont">Name: <input id="nameField" title="Name" type="text" onChange={(e) => setFirstName(e.target.value)}/>Surname: <input id="surnameField" title="Surame" type="text" onChange={(e) => setLastName(e.target.value)}/></h3>
                        <h3 className="cont">Email: <input id="emailField" title="Email" type="text" onChange={(e) => setEmail(e.target.value)}/></h3>
                        <h3 className="cont">Message:</h3>
                        <textarea id="messageField" title="Message" type="text" onChange={(e) => setMessage(e.target.value)}/>
                    </div>
                    <button id="sendButton" title="Send" onClick={handleForm}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Main_page;