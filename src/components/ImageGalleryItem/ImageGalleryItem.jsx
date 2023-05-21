import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { webformatURL, largeImageURL, tags },
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <GalleryItem>
      <Image src={webformatURL} alt={tags} onClick={toggleModal} />
      {modalOpen && (
        <Modal onClose={toggleModal} image={largeImageURL} altText={tags} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};
