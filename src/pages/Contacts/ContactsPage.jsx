import { useSelector } from 'react-redux';

import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import { getIsLoggedIn } from 'redux/selectors';

import css from './ContactsPage.module.css';

const ContactsPage = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    isLoggedIn && (
      <div className={css.wrapper}>
        <h1 className={css.titleCont}>Contacts</h1>
        <div className={css.content__wrapper}>
          <Filter />
          <ContactList />
        </div>
      </div>
    )
  );
};
export default ContactsPage;