import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, StyledModal } from './Modal.styled';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, image, altText }) => {
  useEffect(() => {
    const closeOnEsc = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', closeOnEsc);

    return () => {
      window.removeEventListener('keydown', closeOnEsc);
    };
  }, [onClose]);

  const closeOnBackdropClick = e => {
    if (e.currentTarget === e.target) onClose();
  };

  return createPortal(
    <Overlay onClick={closeOnBackdropClick}>
      <StyledModal>
        <img src={image} alt={altText} />
      </StyledModal>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
