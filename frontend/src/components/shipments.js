/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react';
import "./shipments.css"

const Shipments = () => {

    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`/api/shipments`)
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
        <div className='shipments'>
            <div className='shipmentsTitle'>
                <h1>Shipments</h1>
            </div>
            <div className='shipmentsContainer'>
                <table className='shipmentsTable'>
                    <tr>
                        <th>Id Shipment</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Address</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr>
                    {data ? (
                            data.map(item => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.surname}</td>
                                    <td>{item.address}</td>
                                    <td>€ {item.price}</td>
                                    <td>{item.state}</td>
                                </tr>
                                
                            ))
                        ): loading? (
                            <p className='shipmentstemp'>Loading...</p>
                        ) : (
                            <p className='shipmentstemp'>No data available</p>
                        )}
                </table>
                
            </div>
        </div>
    );
}

export default Shipments;
