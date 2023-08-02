import { gql } from '@apollo/client';


export const createContact = gql `
  mutation createContact($newContact: ContactInput) {
    createContact(newContact: $newContact) {
      id
      name
      email
      phone
    }
  }
`;

export const updateContact = gql `
  mutation updateContact($input: ContactInput) {
    updateContact(input: $input) {
      id
      name
      email
      phone
    }
  }
`;

export const deleteContact = gql `
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
      id
      name
      email
      phone
    }
  }
`;
