// components/ContactList.tsx
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import AppSyncProvider from '@/lib/apolloConfig';
import { getAllContacts } from '../graphql/queries'; // Import the query
import Link from 'next/link';
import styles from '../styles/ContactList.module.scss';


const GET_ALL_CONTACTS = gql`
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

const ContactList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_CONTACTS, {

  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { contacts } = data.getAllContacts;

  return (
    <div className={styles.ContactList}>
      <h1>Contact List</h1>
      <Link href="/new">
          <button className={styles['add-contact-btn']}>Add Contact</button>
        </Link>
      <ul className={styles['contact-list']}>
        {contacts.map((contact: any) => (
          <li className={styles['contact-item']} key={contact.id}>
            <a href={`/contacts/${contact.id}`}>{contact.name || 'BLANK NAME, SHOULD HAVE VALIDATED INPUTS...'}</a> 
            {/* Accidentally added a blank contact, this was easiest way to get back to it to delete it */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
