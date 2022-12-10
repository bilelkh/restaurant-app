import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import {
    Link,
} from "react-router-dom";
import ReceiptsDataService from '../services/receipts'
const ReceiptsList = () => {
    const [receipts, setReceipts] = useState([
        {
            id: 1,
            name: 'Pizza',
            category: 'Fast Food',
            ingredients: ['Tomato', 'Cheese', 'Bread'],
            description: 'A pizza is a flatbread',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Neapolitan_pizza.jpg/1200px-Neapolitan_pizza.jpg'
        },
        {
            id: 2,
            name: 'Hamburger',
            category: 'Fast Food',
            ingredients: ['Bread', 'Meat', 'Salad'],
            description: 'A hamburger is a sandwich consisting of one or more cooked patties of ground meat,',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg'
        },
        {
            id: 3,
            name: 'Pasta',
            category: 'Italian',
            ingredients: ['Pasta', 'Tomato', 'Cheese'],
            description: 'Pasta is a',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg'
        }])
    const getAllReceipts = () => {
        ReceiptsDataService.getAll().then(response => {
            setReceipts(response.data)
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        getAllReceipts()
        // ReceiptsDataService.getAll()
        //     .then(response => {
    }, [])



    return (
        <div className='row receipts-list mt-5' >
            <div className='col-md-12'>
                <Link
                    className='btn btn-primary add-button'
                    to="/add-new-receipt"
                >
                    Ajouter une nouvelle recette
                </Link>
            </div>
            <div className='col-md-12'>
                <h1>List des Recettes</h1>
            </div>
            <Table striped="columns">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>nom</th>
                        <th>description</th>
                        <th>image</th>
                    </tr>
                </thead>
                <tbody>
                    {receipts.map((receipt, index) => (
                        <tr>
                            <td>{index}</td>
                            <td>{receipt.name}</td>
                            <td>{receipt.description}</td>
                            <td><img src={receipt.image} width='50' height={50} /></td>
                        </tr>))}
                </tbody>
            </Table>
        </div>
    )
}

export default ReceiptsList