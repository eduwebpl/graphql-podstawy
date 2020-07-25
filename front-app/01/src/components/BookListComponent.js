import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

export default function BookList() {
    const cards = [
        {
            id: '1',
            title: 'Mock book 1',
            author: 'Joe Doe'
        },
        {
            id: '1',
            title: 'Mock book 2',
            author: 'Joe Doe'
        },
        {
            id: '1',
            title: 'Mock book 3',
            author: 'Joe Doe'
        }
    ]

    return (
        <>
            {cards.map(card => (
                <Card key={card.id} style={{ width: '22rem', margin: '1rem' }}>
                    <Card.Body>
                        <Card.Title>{card.title}</Card.Title>
                        <Card.Text>
                            {card.author}
                        </Card.Text>
                        <Link to={`/book/details/${card.id}`}>
                            <Button variant="primary">Details</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
}