import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import { gql, useQuery } from '@apollo/client';
import {BookFragments} from '../graphql-services/book.fragments';

const BOOK_QUERY = gql`
    query getBook {
        books: getBooks {
            ...CommonBook
        }
    }
    ${BookFragments.commonBook}
`;

export default function BookList() {
    const { data, loading, error } = useQuery(BOOK_QUERY);

    if (loading) {
        return 'loading...';
    }
    
    if (error) {
        return 'Something went wrong!'
    }
    
    const cards = data.books.map(book => {
        const { title, id, authors } = book;
        
        const author = authors.reduce((acc, author) => {
            let authorName = `${author.firstName} ${author.lastName}`;
            
            if (acc.length) {
                acc += `, ${authorName}`
            } else {
                acc += authorName
            }
            
            return acc;
        }, '')
        
        return { 
            title,
            id,
            author
        }
    });

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