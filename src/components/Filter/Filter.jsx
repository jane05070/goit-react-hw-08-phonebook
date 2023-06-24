import { selectFilter } from 'redux/filters/filterSeletors';
import css from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'redux/filters/filtersSlice';

const Filter = () => {
  const dispatch = useDispatch();

  const onSetFilter = payload => {
    dispatch(setFilter(payload));
  };

  const updateFilter = event => {
    onSetFilter(event.target.value);
  };

  const filter = useSelector(selectFilter);
  return (
    <>
      <label className={css.title}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          value={filter}
          onChange={updateFilter}
        />
      </label>
    </>
  );
};

export default Filter;