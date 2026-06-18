/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react';
import "./orders.css"

const Orders = () => {

    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`https://bike-heaven.onrender.com/api/sales`)
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
        <div className='orders'>
            <div className='ordersTitle'>
                <h1>Sales</h1>
            </div>
            <div className='ordersContainer'>
                <table className='ordersTable'>
                    <tr>
                        <th>Id Order</th>
                        <th>Id Customer</th>
                        <th>Sale Date</th>
                        <th>Total Price</th>
                        <th>Method</th>
                        <th>Status</th>
                    </tr>
                    {data ? (
                            data.map(item => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.customer}</td>
                                    <td>{item.date}</td>
                                    <td>€ {item.price}</td>
                                    <td>{item.method}</td>
                                    <td>{item.state}</td>
                                </tr>
                                
                            ))
                        ): loading? (
                            <p className='ordertemp'>Loading...</p>
                        ) : (
                            <p className='ordertemp'>No data available</p>
                        )}
                </table>
                
            </div>
        </div>
    );
}

export default Orders;
