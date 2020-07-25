import React, {useState} from 'react';

export function BookDetails() {
  const book = {
      id: '1',
      title: 'Mock Book'
  };
  
  const comments = [
      {
          id: '1',
          content: 'First comment for mock book'
      }
  ];

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