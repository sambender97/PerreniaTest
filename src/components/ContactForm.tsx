// components/ContactForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client'; // Import the gql function
import { createContact } from '../graphql/mutations'; // Import the mutation
import styles from '../styles/ContactCard.module.scss';


const CREATE_CONTACT_MUTATION = gql `
mutation createContact($newContact: ContactInput) {
  createContact(newContact: $newContact) {
    id
    name
    email
    phone
  }
}
`;

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
      });

      


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createContactMutation({
      variables: { newContact: formData },
    }).then(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
      });
    });
  };

  const router = useRouter();

const [createContactMutation, { loading: adding }] = useMutation(CREATE_CONTACT_MUTATION, {
  onCompleted: () => {
    // send back to main page after contact is added
    router.push('/');
  },
});

  return (
    <div className={styles.ContactCard}>
            <h2>Add A New Contact</h2>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      
      <button type="submit">Add Contact</button>
    
    </form>
    </div>
  );
};

export default ContactForm;
