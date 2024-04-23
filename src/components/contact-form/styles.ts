import styled from 'styled-components';

interface SButton {
  $disabled: boolean;
}

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  width: 300px;
  height: 40px;
`;

export const CheckBox = styled.input`
  width: 24px;
  height: 24px;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const ErrorMessage = styled.div`
  color: rgb(241, 62, 75);
  font-size: 10px;
`;

export const Button = styled.button<SButton>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 280px;
  height: 48px;
  color: rgb(255, 255, 255);
  background-color: ${(props) =>
    props.$disabled ? 'rgb(128, 128, 128)' : 'rgb(24, 86, 205)'};
  border-radius: 4px;
  margin: 0 auto;
`;
