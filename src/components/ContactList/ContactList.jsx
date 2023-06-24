import { useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/contacts/contactsSelectors';
import css from './ContactList.module.css';
import ContactItem from 'components/ContactItem/ContactItem';

export const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.container}>
      {contacts.map(contact => (
        <li className={css.item} key={contact.id}>
          <ContactItem contact={contact} />
        </li>
      ))}
    </ul>
  );
};
