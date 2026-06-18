/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react'
import CardNew from './card_new'
import "./inventory.css"

const Inventory = () => {

    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`https://bike-heaven.onrender.com/api/inventory`)
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
        <div className='inventory'>
            <div className='inventoryTitle'>
                <h1>Inventory</h1>
            </div>
            <div className='inventoryContainer'>
                <table className='inventoryTable'>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>quantity</th>
                    </tr>
                    {data ? (
                            data.map(item => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.brand}</td>
                                    <td>€ {item.price}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                                
                            ))
                        ): loading? (
                            <p className='temp'>Loading...</p>
                        ) : (
                            <p className='temp'>No data available</p>
                        )}
                </table>
                
            </div>
        </div>
    );
}

export default Inventory;
