import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

button {
  background: inherit;
  cursor: pointer;
  font: inherit;
  color: inherit;
  border: none;
  border-radius: 0;
}


img {
  max-width: 100%;
}
`;

export default GlobalStyles;
