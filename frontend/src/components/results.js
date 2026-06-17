/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import './results.css';
import CardNew from './card_new';


function Results(){
    const params = useParams()
    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('');
    let p = params.searchID
    let length = data.length


    useEffect(() => {
        async function fetchData() {
            try{

                const dat = JSON.stringify(params)
                const parsedData = JSON.parse(dat)
                const searchName = parsedData.searchID
                console.log("Search Name: ", searchName)
                const response = await fetch(`/api/search/${searchName}`)
                if (response.status === 500) {
                    throw new Error("Fetching data failed");
                }

                const JSONData = await response.json();
                setData(JSONData.data.oggetti);
                if (JSONData.data.oggetti.length === 0) {
                    setLoading(false);
                    return;
                }
                setLoading(false);
            
            }catch(err){
                console.log("Error: ", err)
                setLoading(false)
            }
        }

        fetchData()
        
    },[])

    const handleChange = (e) => {
        setSearchText(e.target.value)
    }

    async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        const searchName = e.target.value
        const response = await fetch(`/api/search/${searchName}`)
        if (response.status === 500) {
            throw new Error("Fetching data failed");
        }

        const JSONData = await response.json();
        setData(JSONData.data.oggetti)
        setLoading(false)
    }

    return(
        <div className="resultsContainer">
            <div className="resultPage">
                <div className="resultString">
                    Results for <em>"{p}"</em>
                    <p>Showing {length} results.</p>
                </div>
                <div className="card_container">
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
                        <div className="noResults">
                            <p>No products found for "{p}"</p>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

export default Results;