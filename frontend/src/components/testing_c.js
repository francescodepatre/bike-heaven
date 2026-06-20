/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useEffect, useState} from 'react';

function Testing_component(){

    const [backendData, setBackendData] = useState([{}])
    
    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(
            data => {
                setBackendData(data)
            }
        )

    }, [])

    return(
        <div>
            {(typeof backendData.users === 'undefined') ? (
                <p>loading...</p>
            ):(
                backendData.users.map((user, i) => (
                    <p key={i}>{user}</p>
                ))
            )}
        </div>
    )

}

export default Testing_component
