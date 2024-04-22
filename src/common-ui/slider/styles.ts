import styled from 'styled-components';

interface SlidesContainerProps {
  $slideindex: number;
}

export const Slider = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const SlidesContainer = styled.div<SlidesContainerProps>`
  display: flex;
  transform: ${(props) => `translateX(-${props.$slideindex * 100}%)`};
  transition: transform 0.3s ease;
  height: inherit;
`;

export const Slide = styled.div`
  min-width: 100%;
  max-width: 100%;
  height: inherit;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
`;

export const LeftButton = styled(Button)`
  left: 24px;

  @media (min-width: 1020px) {
    left: 48px;
  }
`;

export const RightButton = styled(Button)`
  right: 24px;

  @media (min-width: 1020px) {
    right: 48px;
  }
`;
