import React from 'react';

import { Container, Navbar, Nav } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';

import Cart from '../Cart';

import './TopMenu.scss';

export default function TopMenu(props) {
    const { productsCart, getProductsCart, products } = props;
    return (
        <Navbar bg="dark" variant="dark" className="top-menu">
            <Container>
                {/* Logo */}
                <BrandNav />
                <Cart
                    productsCart={ productsCart } 
                    getProductsCart={ getProductsCart }
                    products={ products }
                />
                {/* Menu */}
                {/* <MenuNav /> */}
            </Container>
        </Navbar>
    )
}

function BrandNav() {
    return (
        <Navbar.Brand>
            <Logo />
            <h3 className="logo-title">Ice Cream's House</h3>
        </Navbar.Brand>
    )
}

function MenuNav() {
    return (
        <Nav className="mr-auto">
            <Nav.Link href="#">Nosotros</Nav.Link>
            <Nav.Link href="#">Sabores</Nav.Link>
            <Nav.Link href="#">Contacto</Nav.Link>
        </Nav>
    )
}
