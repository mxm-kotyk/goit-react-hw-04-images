import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchButtonLabel,
  SearchField,
  SearchIcon,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { searchQuery: '' },
    onSubmit: ({ searchQuery }) => {
      onSubmit(searchQuery);
      formik.resetForm();
    },
  });

  return (
    <Header>
      <SearchForm onSubmit={formik.handleSubmit}>
        <SearchButton type="submit">
          <SearchIcon />
          <SearchButtonLabel>Search</SearchButtonLabel>
        </SearchButton>

        <SearchField
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={formik.handleChange}
          value={formik.values.searchQuery}
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
