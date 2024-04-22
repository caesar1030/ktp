import styled from 'styled-components';

export const Contact = styled.div`
  position: fixed;
  top: 80px;
  right: 40px;
  width: fit-content;

  max-height: calc(90vh - 80px);
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 300ms ease-in;
  border: 1.5px solid rgb(24, 86, 205);
  border-radius: 12px;
  background-color: #fff;
  z-index: 1000;
`;

export const Button = styled.button`
  font-size: 18px;
  color: rgb(24, 86, 205);
  padding: 8px 24px;
`;
