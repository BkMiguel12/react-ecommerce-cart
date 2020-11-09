import React from 'react';

import { Container, Row } from 'react-bootstrap';

import Loading from '../Loading';

export default function Products(props) {

    const { products: { loading, error, result } } = props;

    console.log(result);
    return (
        <Container>
            <Row>
                {loading || result ? (
                    <Loading />
                ) : (
                    <ul>
                        {
                            result.map((product, idx) => ( <li key={idx}>{ product.name }</li> ))
                        }
                    </ul>
                )}
            </Row>
        </Container>
    )
}
