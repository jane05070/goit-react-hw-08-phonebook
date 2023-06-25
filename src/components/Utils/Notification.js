import { toast } from 'react-toastify';

export const loginError = () => toast.error('Sorry, wrong email or password!');

export const registerError = () =>
  toast.error(
    'Sorry, incorrect data entered! check the password and email, it must be longer than 7 characters'
  );

export const serverError = () =>
  toast.error('Sorry, something went wrong, please try again later!');

export const notifyAddContact = () => toast.success('Contact added!');

export const notifyDeliteContact = () => toast.info('Contact deleted!');

export const notifyUpdateContact = () =>
  toast.success('The contact has been successfully updated!');