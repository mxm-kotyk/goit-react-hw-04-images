import { useState, useEffect } from 'react';
import { AppWrapper, CenteredContainer } from './App.styled';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { LoadMoreButton } from './LoadMoreButton';
import { Loader } from './Loader';
import * as API from './services/pixabay-api';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    if (!searchQuery) return;

    getSearchResult(searchQuery, page);
  }, [page, searchQuery]);

  const getSearchResult = async (searchQuery, page) => {
    setIsLoading(true);
    try {
      const result = await API.getImages(searchQuery, page);
      setTotalImages(result.total);
      setImages(prev => [...prev, ...result.hits]);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = query => {
    if (query !== searchQuery) setImages([]);
    setSearchQuery(query);
    setPage(1);
    setError(null);
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
    setTimeout(() => {
      window.scrollBy({
        top: 510,
        behavior: 'smooth',
      });
    }, 400);
  };

  const errorMessage = error && (
    <h2>
      Ooops, something went wrong... Server says: "{error}". Try reloading the
      page.
    </h2>
  );

  const noResultsMessage = images.length === 0 &&
    searchQuery !== '' &&
    !isLoading &&
    !error && (
      <h2>
        Sorry, there are no images matching "{searchQuery}". Please try again.
      </h2>
    );

  const endOfResultsMessage = images.length === totalImages &&
    images.length !== 0 && (
      <h2>We're sorry, but you've reached the end of search results.</h2>
    );

  const loadingIndicator = isLoading && <Loader />;

  const loadMoreButton = images.length !== totalImages && !isLoading && (
    <LoadMoreButton onClick={handleLoadMore} />
  );

  return (
    <AppWrapper>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      <CenteredContainer>
        {errorMessage}
        {noResultsMessage}
        {endOfResultsMessage}
        {loadingIndicator}
        {loadMoreButton}
      </CenteredContainer>
    </AppWrapper>
  );
};
