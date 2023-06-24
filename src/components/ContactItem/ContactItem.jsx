import { PropTypes } from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import { RotatingLines } from 'react-loader-spinner';
import { useEffect, useState } from 'react';

import {
  useDeleteContactMutation,
  useUpdateContactMutation,
} from 'redux/contactsSlice';
import css from './ContactItem.module.css';
import {
  notifyDeliteContact,
  notifyUpdateContact,
} from 'components/Utils/Notification';
import { ToastContainer } from 'react-toastify';

const ContactItem = ({ id, name, number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedNumber, setEditedNumber] = useState(number);

  const [updateContact, { isLoading: isUpdating, isSuccess: isUpdated }] =
    useUpdateContactMutation();
  const [deleteContact, { isLoading: isDeleting, isSuccess: isDeleted }] =
    useDeleteContactMutation();

  useEffect(() => {
    if (isUpdated) {
      notifyUpdateContact();
      setIsEditing(false);
    }
    if (isDeleted) {
      notifyDeliteContact();
    }
  }, [isDeleted, isUpdated]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedName(name);
    setEditedNumber(number);
  };

  const handleSaveClick = () => {
    updateContact({ id, name: editedName, number: editedNumber });
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id);
    }
  };

  const handleChange = e => {
    if (e.target.name === 'name') {
      setEditedName(e.target.value);
    } else if (e.target.name === 'number') {
      setEditedNumber(e.target.value);
    }
  };

  return (
    <>
      <ToastContainer autoClose={1500} position="top-right" />
      <li className={css.contactItem}>
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="number"
              value={editedNumber}
              onChange={handleChange}
            />
            <div className={css.btn__wrapper}>
              <button
                className={css.btn}
                onClick={handleSaveClick}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <RotatingLines height="20" width="20" />
                ) : (
                  <span> Save</span>
                )}
              </button>
              <button className={css.btn} onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className={css.contact__wrapper}>
              <span className={css.contact__name}>{name}:</span>
              <span>{number}</span>
            </div>
            <div className={css.btn__wrapper}>
              <button className={css.btn} onClick={handleEditClick}>
                Edit
              </button>
              <button
                className={css.btn}
                onClick={handleDeleteClick}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <RotatingLines height="20" width="20" />
                ) : (
                  <span>Delete</span>
                )}
              </button>
            </div>
          </>
        )}
      </li>
    </>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;