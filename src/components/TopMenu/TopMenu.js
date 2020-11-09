import React from 'react';

import { Container, Navbar, Nav } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../assets/img/logo.svg';

import './TopMenu.scss';

export default function TopMenu() {
    return (
        <Navbar bg="dark" variant="dark" className="top-menu">
            <Container>
                {/* Logo */}
                <BrandNav />

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
