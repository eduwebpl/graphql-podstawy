import {v4 as uuidv4} from "uuid";

export const authorRootResolver = {
  getAuthor: (_, {id}, {db}) => db.authors.find(author => author.id === id)
}

export const authorRootMutation = {
  addAuthor: (_, { authorDetails }, { db }) => {
    const author = {
      id: uuidv4(),
      ...authorDetails
    };

    db.authors.push(author);

    return author;
  }
}
