// src/components/CartSidebar.js
import React from 'react';
import { useSelector } from 'react-redux';

const CartSidebar = () => {
    const cartItems = useSelector(state => state.cart.items);
    console.log("Items dans le panier :", cartItems);

    return (
        <div className="cart-sidebar">
            <h2>Mon Panier</h2>
            {cartItems.length > 0 ? (
                cartItems.map(({item, quantity}) => ( // Déstructurez pour obtenir item et quantity
                    <div key={item.id}>
                        {item.title} - Quantité: {quantity}
                    </div>
                ))
            ) : (
                <p>Votre panier est vide.</p>
            )}
        </div>
    );
};

export default CartSidebar;
