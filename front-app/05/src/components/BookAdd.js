import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { gql, useMutation } from '@apollo/client';

const ADD_BOOK = gql`
    mutation addBook($bookDetails: BookInput) {
        addBook(bookDetails: $bookDetails) {
            id
        }
    }
`;

export function BookAdd() {
  const [bookAdded, setBookAdded] = useState(false);
  const [addBook] = useMutation(ADD_BOOK, {
      onCompleted: () => {
          setBookAdded(true);
      }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const {bookTitle, bookAuthorsIds} = event.target.elements;
    const ids = bookAuthorsIds.value.replace(' ', '').split(',');

    addBook({
        variables: {
            bookDetails: {
                title: bookTitle.value,
                authors: {
                    connect: {
                        ids
                    }
                }
            }
        }
    });
  }

  return (
    <Form style={{margin: '1rem'}} onSubmit={handleSubmit}>
      <Form.Group controlId="bookTitle">
        <Form.Label>Book Title:</Form.Label>
        <Form.Control type="text" placeholder="Enter title" />
      </Form.Group>

      <Form.Group controlId="bookAuthorsIds">
        <Form.Label>Book Authors IDs:</Form.Label>
        <Form.Control type="text" placeholder="Enter authors ids split by comma" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Book
      </Button>
      {bookAdded && (
        <Alert variant="success" style={{marginTop: '1rem'}}>
          Book was successfully added!
        </Alert>
      )}
    </Form>
  )
}