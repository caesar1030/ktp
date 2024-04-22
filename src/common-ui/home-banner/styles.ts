import styled from 'styled-components';

interface ImageProps {
  $small: string;
  $large: string;
}

export const HomeBanner = styled.div`
  height: 100vh;
`;

export const Image = styled.img<ImageProps>`
  width: 100%;
  height: 100%;
  object-fit: contain;

  content: url(${(props) => props.$small});

  @media (min-width: 1020px) {
    content: url(${(props) => props.$large});
  }
`;
