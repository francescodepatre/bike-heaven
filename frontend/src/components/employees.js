/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, {useState, useEffect} from 'react';
import "./employees.css";

const Employees = () => {

    const [data,setData] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(`/api/employees`)
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
        <div className='employees'>
            <div className='employeesTitle'>
                <h1>Employees</h1>
            </div>
            <div className='employeesContainer'>
                <table className='employeesTable'>
                    <tr>
                        <th>Id Employee</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                    {data ? (
                            data.map(item => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.address}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.username}</td>
                                    <td>{item.password}</td>
                                </tr>
                                
                            ))
                        ): loading? (
                            <p className='employeestemp'>Loading...</p>
                        ) : (
                            <p className='employeestemp'>No data available</p>
                        )}
                </table>
                
            </div>
        </div>
    );
}

export default Employees;
