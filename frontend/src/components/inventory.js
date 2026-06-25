/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react'
import CardNew from './card_new'
import "./style/inventory.css"

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
    <div>
        <div className="ep-header">
        <p className="ep-eyebrow">Magazzino</p>
        <h1 className="ep-title">Inventario</h1>
        </div>
        <div className="ep-body">
        <div className="ep-table-wrap">
            <table className="ep-table">
            <thead>
                <tr>
                <th>ID</th><th>Nome</th><th>Brand</th><th>Prezzo</th><th>Quantità</th>
                </tr>
            </thead>
            <tbody>
                {loading && (
                <tr><td colSpan={5} className="ep-state">Caricamento…</td></tr>
                )}
                {!loading && !data?.length && (
                <tr><td colSpan={5} className="ep-state">Nessun prodotto disponibile.</td></tr>
                )}
                {data && data.map(item => (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.brand}</td>
                    <td>€ {item.price}</td>
                    <td>{item.quantity}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
    );
}

export default Inventory;
