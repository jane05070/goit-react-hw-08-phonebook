import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.wrapper}>
      <h1>Welcome to your Phonebook!</h1>
      <p>
        Welcome to Phone Book, this application will allow you to store private
        data and manage it with ease
      </p>
    </div>
  );
};
export default HomePage;