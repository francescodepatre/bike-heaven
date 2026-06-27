/*
    Author: @FrancescoDePatre
    Matricola: 318319
    Università di Parma - Corso di Tecnologie Internet
    Email:  francesco.depatre@studenti.unipr.it
*/
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import PersonalCard from "./components/personalCard";
import "./cart.css";

const API_BASE = "https://bike-heaven.onrender.com/api";
const SHIPPING = 10;

function Cart() {
    const navigate  = useNavigate();
    const { token } = useParams();

    const [bikes,       setBikes]       = useState([]);
    const [accessories, setAccessories] = useState([]);
    const [services,    setServices]    = useState([]);
    const [cartId,      setCartId]      = useState('');
    const [loading,     setLoading]     = useState(true);
    const [fetchError,  setFetchError]  = useState(false);

    /* ── Totali ────────────────────────────────────────────────── */
    const sum = arr => arr.reduce((acc, item) => acc + parseFloat(item.price), 0);

    const subtotal = sum(bikes) + sum(accessories) + sum(services);
    const hasItems = subtotal > 0;
    const total    = hasItems ? subtotal + SHIPPING : 0;

    /* ── Fetch carrello ─────────────────────────────────────────── */
    const fetchCart = useCallback(async () => {
        setLoading(true);
        setFetchError(false);
        try {
            const response = await fetch(`${API_BASE}/getCart/${token}`);
            if (!response.ok) throw new Error("Fetching data failed");

            const data = await response.json();
            setCartId(data.idCart);
            setBikes(data.bikes?.oggetti        || []);
            setAccessories(data.accessories?.oggetti || []);
            setServices(data.services?.oggetti   || []);
        } catch (err) {
            setFetchError(true);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => { fetchCart(); }, [fetchCart]);

    /* ── Rimozione item ─────────────────────────────────────────── */
    const removeItemFromCart = useCallback((id) => {
        setBikes(prev       => prev.filter(item => item.id !== id));
        setAccessories(prev => prev.filter(item => item.id !== id));
        setServices(prev    => prev.filter(item => item.id !== id));
    }, []);

    /* ── Checkout ───────────────────────────────────────────────── */
    function handleCheckout(e) {
        e.preventDefault();
        if (hasItems) navigate(`/checkout/${cartId}/cart`);
    }

    /* ── Sezione prodotti ───────────────────────────────────────── */
    function ProductSection({ title, items, emptyMsg, category }) {
        return (
            <section className="cart_section">
                <h2 className="cart_section_title">{title}</h2>
                <div className="cart_grid">
                    {items.length > 0 ? (
                        items.map(item => (
                            <PersonalCard
                                key={item.id}
                                id={item.id}
                                title={item.name}
                                price={item.price}
                                description={item.desc}
                                immagine={`data:image/jpeg;base64,${item.picture}`}
                                category={category}
                                removeItemFromCart={removeItemFromCart}
                            />
                        ))
                    ) : (
                        <p className="cart_empty">{emptyMsg}</p>
                    )}
                </div>
            </section>
        );
    }

    /* ── Render ─────────────────────────────────────────────────── */
    if (loading) return (
        <div className="cart_page">
            <p className="cart_state_msg">Loading your cart…</p>
        </div>
    );

    if (fetchError) return (
        <div className="cart_page">
            <p className="cart_state_msg cart_state_error">
                Could not load your cart.{' '}
                <button className="cart_retry" onClick={fetchCart}>Retry</button>
            </p>
        </div>
    );

    return (
        <div className="cart_page">

            <header className="cart_header">
                <h1 className="cart_title">Your Cart</h1>
            </header>

            <div className="cart_layout">

                {/* ── Lista prodotti ── */}
                <div className="cart_products">
                    <ProductSection
                        title="Bicycles"
                        items={bikes}
                        emptyMsg="No bicycles in the cart."
                        category={1}
                    />
                    <ProductSection
                        title="Accessories"
                        items={accessories}
                        emptyMsg="No accessories in the cart."
                        category={2}
                    />
                    <ProductSection
                        title="Services"
                        items={services}
                        emptyMsg="No services in the cart."
                        category={3}
                    />
                </div>

                {/* ── Riepilogo ordine ── */}
                <aside className="cart_summary">
                    <h2 className="cart_summary_title">Summary</h2>

                    <table className="cart_summary_table">
                        <tbody>
                            {[...bikes, ...accessories, ...services].map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td className="cart_price">€{parseFloat(item.price).toFixed(2)}</td>
                                </tr>
                            ))}

                            {hasItems && (
                                <>
                                    <tr className="cart_divider_row"><td colSpan={2}></td></tr>
                                    <tr className="cart_subtotal_row">
                                        <td>Subtotal</td>
                                        <td className="cart_price">€{subtotal.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td>Shipping</td>
                                        <td className="cart_price">€{SHIPPING.toFixed(2)}</td>
                                    </tr>
                                    <tr className="cart_divider_row"><td colSpan={2}></td></tr>
                                    <tr className="cart_total_row">
                                        <td>Total</td>
                                        <td className="cart_price">€{total.toFixed(2)}</td>
                                    </tr>
                                </>
                            )}

                            {!hasItems && (
                                <tr>
                                    <td colSpan={2} className="cart_empty_summary">
                                        Your cart is empty.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <button
                        className="cart_checkout_btn"
                        onClick={handleCheckout}
                        disabled={!hasItems}
                        aria-disabled={!hasItems}
                    >
                        Proceed to checkout
                    </button>
                </aside>

            </div>
        </div>
    );
}

export default Cart;