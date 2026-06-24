/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
const pool = require('./db')
const categoryFinder = require('./categoryName')

const BIKE_CATEGORIES = new Set(['Road Bicycles', 'Mountain Bikes', 'City Bikes', 'E-bikes', 'Bikes for Kids'])

async function getProduct(id) {
    try {
        const { category } = await categoryFinder(id)
        if (!category) return { success: false, category: null, product: null }

        if (BIKE_CATEGORIES.has(category)) {
            const { rows } = await pool.query('SELECT * FROM bicycles WHERE id = $1', [id])
            if (rows.length === 0) return { success: false, category: null, product: null }
            const r = rows[0]
            return {
                success: true, category,
                product: {
                    name: r.name, price: r.price, description: r.description,
                    feedback: r.feedback, brand: r.brand, frame: r.frame,
                    dimensions: r.dimensions, gear: r.gear, brakes: r.brakes,
                    suspensions: r.suspensions, weight: r.weight, quantity: r.quantity,
                    picture: r.picture ? Buffer.from(r.picture).toString('base64') : null
                }
            }
        }

        if (category === 'Accessories') {
            const { rows } = await pool.query('SELECT * FROM accessories WHERE id = $1', [id])
            if (rows.length === 0) return { success: false, category: null, product: null }
            const r = rows[0]
            return {
                success: true, category,
                product: {
                    name: r.name, price: r.price, description: r.description,
                    feedback: r.feedback, brand: r.brand, quantity: r.quantity,
                    picture: r.picture ? Buffer.from(r.picture).toString('base64') : null
                }
            }
        }

        if (category === 'Services') {
            const { rows } = await pool.query('SELECT * FROM services WHERE id = $1', [id])
            if (rows.length === 0) return { success: false, category: null, product: null }
            const r = rows[0]
            return {
                success: true, category,
                product: {
                    name: r.name, price: r.price, description: r.description,
                    feedback: r.feedback, brand: r.brand,
                    picture: r.picture ? Buffer.from(r.picture).toString('base64') : null
                }
            }
        }

        return { success: false, category: null, product: null }
    } catch (err) {
        console.error('getProduct error:', err)
        return { success: false, category: null, product: null }
    }
}

module.exports = getProduct