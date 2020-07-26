import React, {useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {useParams} from 'react-router-dom';
import {BookFragments} from '../graphql-services/book.fragments';

const BOOK_QUERY = gql`
    query getBook($id: ID!) {
        book: getBook(id: $id) {
            ...CommonBook
            comments {
                id
                content
            }
        }
    }
    ${BookFragments.commonBook}
`;

export function BookDetails() {
  const {id} = useParams();  
  const {data, loading, error} = useQuery(BOOK_QUERY, {
      variables: {
          id
      }
  });
  
  if (loading) {
      return 'loading...'
  }
  
  if (error) {
      return 'Something went wrong!'
  }
  
  const {book} = data;
  
  const {comments} = book;

  return (
    <div style={{margin: '1rem'}}>
      <h1>{book.title}</h1>
      <hr />
      <h3>Comments:</h3>
      {comments.map(comment => (
        <div key={comment.id} style={{marginBottom: '0.5rem'}}>
          <p>{comment.content}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}