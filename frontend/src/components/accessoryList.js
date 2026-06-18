/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react';
import "./style/list.css";

const AccessoryList = () => {
    
    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`https://bike-heaven.onrender.com/api/accessoryList`)
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
                <h1>Accessories</h1>
            </div>
            <div className='itemContainer'>
                <table className='itemsTable'>
                    <tr>
                        <th>Id Accessory</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    {data ? (
                            data.map(item => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
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

export default AccessoryList;
