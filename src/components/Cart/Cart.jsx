import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { STORAGE_PRODUCTS_CART, BASE_PATH } from '../../utils/constants';
import { removeDuplicatesFromArray, countDuplicatesFromArray, removeItemFromArray } from '../../utils/arrayFunctions';

import './Cart.scss';
import { CartEmpty, CartFull, Close, Garbage } from './assets';

function Cart(props) {
    // Props
    const { productsCart, getProductsCart, products } = props;

    // States
    const [cartState, setcartState] = useState(false);
    const [singleProductsCart, setSingleProductsCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const cartWidth = cartState ? 400 : 0;

    // Effects
    useEffect(() => {
        const allProductsId = removeDuplicatesFromArray(productsCart);
        setSingleProductsCart(allProductsId);
    }, [productsCart]);

    useEffect(() => {
        const productData = [];
        let totalPrice = 0;

        const allProductsId = removeDuplicatesFromArray(productsCart);
        allProductsId.forEach(productId => {
            const quantity = countDuplicatesFromArray(productId, productsCart);
            const productValue = {
                id: productId,
                quantity
            }
            productData.push(productValue);
        });
        
        if(!products.loading && products.result) {
            productData.forEach((product) => {
                const productValue = products.result.find(item => item.id === product.id);
                const productPrice = productValue.price * product.quantity;
                totalPrice += productPrice;
            });
        }

        setTotalPrice(totalPrice);
    }, [productsCart, products]);

    const toggleCart = () => {
        setcartState(!cartState);
        document.body.style.overflow = cartState ? 'scroll' : 'hidden';
    }

    const clearCart = () => {
        localStorage.removeItem(STORAGE_PRODUCTS_CART);
        getProductsCart();
        toggleCart();
    }

    const increaseQuantity = (id) => {
        const newProductsCart = [...productsCart];
        newProductsCart.push(id);
        localStorage.setItem(STORAGE_PRODUCTS_CART, JSON.stringify(newProductsCart));
        getProductsCart();
    }

    const decreaseQuantity = (id) => {
        const newProductsCart = [...productsCart];
        removeItemFromArray(id, newProductsCart);
        localStorage.setItem(STORAGE_PRODUCTS_CART, JSON.stringify(newProductsCart));
        getProductsCart();
    }

    return (
        <>
            <Button variant='link' className='cart-button' onClick={toggleCart}>
                { 
                    productsCart.length > 0 ? <CartFull /> : <CartEmpty /> 
                }
            </Button>
            <div className="cart-content" style={{ width: cartWidth }}>
                {/* Header */}
                <CartContentHeader 
                    toggleCart={ toggleCart }
                    clearCart = { clearCart }
                />

                {/* Body - products */}
                <div className="cart-content__products">
                    {singleProductsCart.map((productId, index) => (
                        <ProductContainer 
                            key={index}
                            products={ products }
                            cartProductsIds={ productsCart }
                            productId={ productId }
                            increaseQuantity={ increaseQuantity }
                            decreaseQuantity={ decreaseQuantity }
                        />
                    ))}
                </div>

                {/* Footer */}
                <CartContentFooter totalPrice={ totalPrice } />
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

function ProductContainer(props) {
    const { 
        products: { loading, result },
        cartProductsIds,
        productId,
        increaseQuantity,
        decreaseQuantity
    } = props;

    if(!loading && result) {
        return result.filter(item => item.id === productId)
        .map((product, index) => {
            return (
                <RenderProducts
                    key={index}
                    product={ product }
                    quantity={ countDuplicatesFromArray(product.id, cartProductsIds) }
                    increaseQuantity={ increaseQuantity }
                    decreaseQuantity={ decreaseQuantity }
                />
            )
        });
    }

    return null;
}

function RenderProducts(props) {
    const { product, quantity, increaseQuantity, decreaseQuantity } = props;

    return (
        <div className="cart-content__product">
            <div className="cart-content__product__product-image">
                <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
            </div>
            <div className="cart-content__product__product-info">
                <div>
                    <h4>{product.name}</h4>
                    <p>{product.price.toFixed(2)}$ / un</p>
                </div>
                <div className='cart-content__product-info__quantity'>
                    <p>Quantity: {quantity}</p>
                    <ButtonGroup aria-label="Basic example">
                        <Button variant="primary" onClick={() => increaseQuantity(product.id)}>+</Button>
                        <Button variant="primary" onClick={() => decreaseQuantity(product.id)}>-</Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    )
}

function CartContentFooter(props) {
    const { totalPrice } = props;

    return (
        <div className="cart-content__footer p-3">
            <div>
                <p>Total:</p>
                <p>{totalPrice.toFixed(2)}$</p>
            </div>
            <div>
                <Button variant='primary'>Proceed to Checkout</Button>
            </div>
        </div>
    )
}