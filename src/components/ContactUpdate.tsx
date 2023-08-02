// components/ContactUpdate.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql } from '@apollo/client';
import styles from '../styles/ContactCard.module.scss';

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

const UPDATE_CONTACT = gql`
  mutation updateContact($id: ID!, $input: ContactInput) {
    updateContact(id: $id, input: $input) {
      id
      name
      email
      phone
    }
  }
`;

interface ContactUpdateProps {
  contactId: string;
}

const ContactUpdate: React.FC<ContactUpdateProps> = ({ contactId }) => {
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_CONTACT_BY_ID, {
    variables: { id: contactId },
  });

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  const [updateContactMutation, { loading: updating }] = useMutation(UPDATE_CONTACT, {
    onCompleted: () => {
      // Navigate back to the main page after successful update
      router.push('/');
    },
    onError: (error) => {
      console.error('Error updating contact:', error.message);
    },
  });

  React.useEffect(() => {
    // Populate the form with existing contact data when data is available from the query
    if (data && data.getContactById) {
      setFormData(data.getContactById);
    }
  }, [data]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateContactMutation({
      variables: {
        id: contactId,
        input: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      },
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.ContactCard}>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" disabled={updating}>
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default ContactUpdate;
