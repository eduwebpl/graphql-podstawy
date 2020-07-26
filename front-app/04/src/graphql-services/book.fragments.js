import {gql} from '@apollo/client';

export const BookFragments = {
    commonBook: gql`
        fragment CommonBook on Book {
            id
            title
            authors {
                firstName
                lastName
            }
        }
    `
}