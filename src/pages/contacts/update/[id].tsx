// pages/contacts/update/[id].tsx
import React from 'react';
import { useRouter } from 'next/router';
import ContactUpdate from '../../../components/ContactUpdate';

//return update contact form for specific ID
const ContactUpdatePage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <ContactUpdate contactId={id as string} />
    </div>
  );
};

export default ContactUpdatePage;
