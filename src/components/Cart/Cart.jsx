import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { STORAGE_PRODUCTS_CART } from '../../utils/constants';

import './Cart.scss';
import { CartEmpty, CartFull, Close, Garbage } from './assets';

function Cart(props) {
    const { productsCart, getProductsCart } = props;

    const [cartState, setcartState] = useState(false);
    const cartWidth = cartState ? 400 : 0;

    const toggleCart = () => {
        setcartState(!cartState);
        document.body.style.overflow = cartState ? 'scroll' : 'hidden';
    }

    const clearCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS_CART);
        getProductsCart();
        toggleCart();
    }

    return (
        <>
            <Button variant='link' className='cart-button' onClick={toggleCart}>
                { 
                    productsCart.length > 0 ? <CartFull /> : <CartEmpty /> 
                }
            </Button>
            <div className="cart-content" style={{ width: cartWidth }}>
                <CartContentHeader 
                    toggleCart={ toggleCart }
                    clearCart = { clearCart }
                />
                Todos mis productos xD
            </div>
        </>
    )
}

export default Cart;

function CartContentHeader(props) {
    const { toggleCart, clearCart } = props;
    return (
        <div className="cart-content__header">
            <div>
                <Close onClick={toggleCart} />
                <h3>Cart</h3>
            </div>

            <Button variant='link' onClick={clearCart}>
                Clear all
                <Garbage />
            </Button>
        </div>
    )
}