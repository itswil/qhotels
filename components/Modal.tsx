import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styled from 'styled-components';
import IconClose from '../public/close.svg';
import { HtmlProps } from 'next/dist/shared/lib/utils';

const StyledModalBody = styled.div`
  padding-top: 10px;
`;
const StyledModalHeader = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: flex-end;
`;
const StyledModalTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
const StyledModal = styled.div`
  background: white;
  border-radius: 15px;
  margin: 0 5%;
  padding: 20px;
  width: 90%;
`;
const StyledModalOverlay = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 1001;
`;

interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  onClose: () => void;
  title: string;
}

const Modal = (modal: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    modal.onClose();
  };

  const modalContent = modal.show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            <Image
              src={IconClose}
              alt="Close"
              height="40"
              width="40"
            />
          </a>
        </StyledModalHeader>
        {modal.title && <StyledModalTitle>{modal.title}</StyledModalTitle>}
        <StyledModalBody>{modal.children}</StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  const modalDiv = document.getElementById('modal');

  return isBrowser && modalDiv
  ? createPortal(
      modalContent, 
      modalDiv
    )
  : null
}

export default Modal;
