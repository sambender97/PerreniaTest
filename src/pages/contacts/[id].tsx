// pages/contacts/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import ContactCard from '../../components/ContactCard';


//return contact card for specific ID
const ContactDetailsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;


  // id will be the value extracted from the URL
  console.log('ID from URL:', id);

  return (
    <div>
      <ContactCard contactId={id as string} />
    </div>
  );
};

export default ContactDetailsPage;
