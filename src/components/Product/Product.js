import React from 'react'
import { Col, Card, Button } from 'react-bootstrap';
import { BASE_PATH } from '../../utils/constants';

import './Product.scss';

function Product(props) {
    const { product, addProductToCart } = props;

    return (
        <Col xs={4} className="product mb-3">
            <Card>
                <Card.Img variant="top" src={ `${BASE_PATH}/${product.image}` } />
                <Card.Body>
                    <Card.Title className='mb-2'>{ product.name }</Card.Title>
                    <Card.Text>{ product.description }</Card.Text>
                    <Card.Text>{ product.price.toFixed(2) }$ / unidad</Card.Text>
                    <Button variant="outline-info" onClick={ () => addProductToCart(product.id, product.name) }>
                        Add to cart
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Product;