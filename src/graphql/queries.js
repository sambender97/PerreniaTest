import { gql } from '@apollo/client';


export const getAllContacts = gql`
  query getAllContacts($limit: Int, $nextToken: String) {
    getAllContacts(limit: $limit, nextToken: $nextToken) {
      contacts {
        id
        name
        email
        phone
      }
      nextToken
    }
  }
`;

export const getContactById = gql `
  query getContactById($id: ID!) {
    getContactById(id: $id) {
      id
      name
      email
      phone
    }
  }
`;
