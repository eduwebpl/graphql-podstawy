import { v4 as uuidv4 } from 'uuid';
import {authorRootMutation, authorRootResolver} from "./AuthorResolver";

export const bookRootResolver = {
  getBooks: (_, { first, offset }, { db }) => {
    return db.books.slice(offset, first + offset);
  },
  getBook: (_, { id }, { db }) => {
    return db.books.find(book => book.id === id);
  }
};

export const bookRootMutation = {
  addBook: async (_, { bookDetails }, { db }) => {
    const { authors } = bookDetails;

    let resolvedAuthors = [];

    if (authors.connect && authors.connect.ids.length) {
      resolvedAuthors = authors.connect.ids.map(id => (
        authorRootResolver.getAuthor(null, { id }, { db })
      ))
    } else if (authors.create) {
      resolvedAuthors = [
        authorRootMutation.addAuthor(null, {
          authorDetails: authors.create
        }, { db })
      ]
    }

    const book = {
      title: bookDetails.title,
      id: uuidv4(),
      authors: resolvedAuthors.map(author => author.id),
      comments: []
    };

    db.books.push(book);

    return book;
  }
}

export const Book = {
  authors: (parent, args, {db}) => db.authors.filter(author => parent.authors.indexOf(author.id) !== -1),
  comments: (parent, { filterByApproved }, {db}) => {
    return db.comments.filter(comment => {
      const basicFilter = parent.id === comment.bookId;

      if (!filterByApproved) {
        return basicFilter;
      } else {
        return basicFilter && comment.approved;
      }
    })
  },
};
