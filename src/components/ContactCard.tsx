// components/ContactCard.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql } from '@apollo/client';
import { getContactById } from '../graphql/queries';
import styles from '../styles/ContactCard.module.scss';



interface ContactCardProps {
  contactId: string;
}

const DELETE_CONTACT = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

const GET_CONTACT_BY_ID = gql`
  query getContactById($id: ID!) {
    getContactById(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

const ContactCard: React.FC<ContactCardProps> = ({ contactId }) => {
  const { loading, error, data } = useQuery(GET_CONTACT_BY_ID, {
    variables: { id: contactId },
  });


  const [deleteContactMutation, { loading: deleting }] = useMutation(DELETE_CONTACT, {
    onCompleted: () => {
      // Navigate back to the main page after successful deletion
      router.push('/');
    },
    onError: (error) => {
      console.error('Error updating contact:', error.message);
    },
  });

  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (data && data.getContactById) {
        const contactToDeleteId = data.getContactById.id;

        // Execute the delete mutation and provide the contact ID as a variable
        await deleteContactMutation({
          variables: {
            id: contactToDeleteId,
          },
        });
        router.push('/');
      }
    } catch (error) {
      // Handle any error scenarios...
      console.error('Error deleting contact');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = () => {
    router.push(`/contacts/update/${contactId}`);
  };

  if (loading) return <p>Loading...</p>;

  const { getContactById: contact } = data;

  return (
    <div className={styles.ContactCard}>
      <h2>{contact.name}</h2>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
      <div className={styles['button-container']}>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default ContactCard;
