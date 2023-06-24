import { useSelector } from 'react-redux';

import { getIsLoggedIn } from 'redux/selectors';

import css from './AddPage.module.css';
import ContactForm from 'components/ContactForm/ContactForm';

const AddPage = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  return (
    isLoggedIn && (
      <div className={css.wrapper}>
        <h1 className={css.titlePhone}>Add your contact</h1>
        <ContactForm />
      </div>
    )
  );
};
export default AddPage;