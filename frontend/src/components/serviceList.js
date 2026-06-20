/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react';
import "./style/list.css";

const ServiceList = () => {
    
    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`/api/serviceList`)
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
        <div className='listitems'>
            <div className='tableTitle'>
                <h1>Services</h1>
            </div>
            <div className='itemContainer'>
                <table className='itemsTable'>
                    <tr>
                        <th>Id Service</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    {data ? (
                            data.map(item => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                </tr>
                                
                            ))
                        ): loading? (
                            <p className='itemstemp'>Loading...</p>
                        ) : (
                            <p className='itemstemp'>No data available</p>
                        )}
                </table>
                
            </div>
        </div>
    );
}

export default ServiceList;
