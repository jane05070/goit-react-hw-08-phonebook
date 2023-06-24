import { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilteredContacts } from 'redux/contacts/contactsSelectors';
import { addContact } from 'redux/contacts/contactsOperation';

const ContactForm = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectFilteredContacts);

  const handleSubmit = e => {
    e.preventDefault();

    const isContactExist = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContactExist) {
      alert(`User with name ${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ name, number }));
    setName('');
    setNumber('');
  };

  return (
    <form className={css.container} onSubmit={handleSubmit}>
      <label className={css.item}>
        <div className={css.wrap}>Name</div>
        <input
          type="text"
          className={css.input}
          name="name"
          value={name}
          pattern="^[А-Яа-яЁёa-zA-Z\s]+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label className={css.item}>
        <div className={css.wrap}>Number</div>
        <input
          type="tel"
          name="number"
          className={css.input}
          value={number}
          pattern="\+?[0-9\s\-\(\)]+"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={e => setNumber(e.target.value)}
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;