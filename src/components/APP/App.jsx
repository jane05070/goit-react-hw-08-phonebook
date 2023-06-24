import ContactForm from 'components/ContactForm/ContactForm';
import css from './App.module.css';
import Filter from 'components/Filter/Filter';

import { ContactList } from 'components/ContactList/ContactList';
import { selectError, selectIsLoading } from 'redux/contacts/contactsSelectors';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from 'redux/contacts/contactsOperation';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.section}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm />
      </div>
      <div className={css.section}>
        <h2 className={css.subtitle}>Contacts</h2>
        <Filter />
        {isLoading && !error && <b>Request in progress...</b>}
        {error && error}
        <ContactList />
      </div>
    </div>
  );
};