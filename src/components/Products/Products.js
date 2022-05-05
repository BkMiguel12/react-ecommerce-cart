import React from 'react';

import { Container, Row } from 'react-bootstrap';

import Product from '../Product';
import Loading from '../Loading';

export default function Products(props) {

    const { 
        products: { loading, error, result },
        addProductToCart
    } = props;

    return (
        <Container className='py-3'>
            <Row>
                {loading || !result ? (
                    <Loading />
                ) : (
                    <>
                        {
                            result.map((product, idx) => ( 
                                <Product key={idx} product={product} addProductToCart={addProductToCart} />
                            ))
                        }
                    </>
                )}
            </Row>
        </Container>
    )
}
