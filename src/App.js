import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { URL_API, STORAGE_PRODUCTS_CART } from './utils/constants';

import useFetch from './hooks/useFetch';

import TopMenu from "./components/TopMenu";
import Products from './components/Products';

function App() {

  const products = useFetch(URL_API, null);
  const [productsCart, setproductsCart] = useState([]);

  useEffect(() => {
    getProductsCart();
  }, []);

  const getProductsCart = () => {
    const storageContent = localStorage.getItem(STORAGE_PRODUCTS_CART);
    const productsInStorage = storageContent ? JSON.parse(storageContent) : [];
    setproductsCart(productsInStorage);
  }

  const addProductToCart = (id, name) => {
    const productsIds = productsCart;
    productsIds.push(id);
    productsIds.sort();
    setproductsCart(productsIds);
    localStorage.setItem(STORAGE_PRODUCTS_CART, JSON.stringify(productsCart));
    getProductsCart();
    toast.success(`Product ${name} added to cart`);
  }

  return (
    <div className="App">
      <TopMenu 
        productsCart={ productsCart } 
        getProductsCart={ getProductsCart }
        products={ products }
      />
      <Products products={products} addProductToCart={addProductToCart} />
      <ToastContainer 
        position='bottom-left'
        newestOnTop
        autoClose={3000}
      />
    </div>
  );
}

export default App;
