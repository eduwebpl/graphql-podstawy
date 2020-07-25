import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import BookList from './components/BookListComponent';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {BookDetails} from "./components/BookDetails";
import {BookAdd} from "./components/BookAdd";
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql-services/client';

function App() {
  return (
    <ApolloProvider client={client}>
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>Book App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Book list</Nav.Link>
                    <Nav.Link as={Link} to="/book/add">Add Book</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route path="/book/details/:id">
                <BookDetails />
                </Route>
                <Route path="/book/add">
                <BookAdd />
                </Route>
                <Route path="/">
                <BookList />
                </Route>
            </Switch>
        </Router>
    </ApolloProvider>
  );
}

export default App;
