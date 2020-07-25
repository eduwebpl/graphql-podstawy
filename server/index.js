import { GraphQLServer, PubSub } from 'graphql-yoga'
import db from './db';
import { bookRootResolver, Book, bookRootMutation } from "./src/resolvers/BookResolver";
import {authorRootMutation, authorRootResolver} from "./src/resolvers/AuthorResolver";
import { rootCommentMutation } from "./src/resolvers/CommentResolver";
import { commentSubscriptions } from "./src/subscriptions/CommentSubscription";
import {Person, personRootResolver} from "./src/resolvers/PersonResolver";

const typeDefs = `
  type Query {
    getBooks(first: Int = 10, offset: Int = 0): [Book]!
    getBook(id: ID!): Book
    getAuthor(id: ID!): Author
    getPerson: [PersonResults]!
  }

  type Mutation {
    addBook(bookDetails: BookInput): Book
    addAuthor(authorDetails: AuthorInput): Author
    addComment(commentDetails: CommentInput): Comment
    updateComment(id: ID!, commentDetails: CommentInput): Comment
  }
  
  type Subscription {
    commentAdded(bookId: ID!): Comment!
  }
  
  input CommentInput {
    bookId: ID
    content: String
    approved: Boolean
  }
  
  input BookInput {
    title: String!
    authors: AuthorRelationInput!
  }
  
  input AuthorRelationInput {
    connect: ConnectRelationInput
    create: AuthorInput
  }
  
  input ConnectRelationInput {
    ids: [ID!]!
  }
  
  input AuthorInput {
    firstName: String!
    lastName: String!
  }
  
  type Book {
    id: ID!
    title: String!
    authors: [Author]!
    comments(filterByApproved: Boolean = false): [Comment]!
  }
  
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
  }
  
  type Comment {
    id: ID!
    bookId: ID!
    content: String!
    approved: Boolean!
  }
  
  interface Person {
    id: ID!
    age: Int!
    firstName: String!
    lastName: String!
  }
  
  type Woman implements Person {
    id: ID!
    age: Int!
    firstName: String!
    lastName: String!
    favoriteClothes: [String]!
  }
  
  type Man implements Person {
    id: ID!
    age: Int!
    firstName: String!
    lastName: String!
    favoriteCars: [String]!
  }
  
  union PersonResults = Man | Woman
`

const resolvers = {
  Query: {
    ...bookRootResolver,
    ...authorRootResolver,
    ...personRootResolver
  },
  Mutation: {
    ...bookRootMutation,
    ...rootCommentMutation,
    ...authorRootMutation
  },
  Subscription: {
    ...commentSubscriptions
  },
  Book,
  PersonResults: Person
}

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: {
    db,
    pubsub
  },
});

server.start(() => console.log('Server is running on localhost:4000'))

