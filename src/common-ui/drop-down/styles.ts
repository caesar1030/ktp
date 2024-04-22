import styled from 'styled-components';

interface DropDownProps {
  $isexpanded: boolean;
  $triggerwidth: number;
  $contentwidth: number;
}

interface ContentProps {
  $isexpanded: boolean;
}

export const DropDown = styled.div<DropDownProps>`
  width: ${({ $isexpanded, $contentwidth, $triggerwidth }) => {
    if (!$isexpanded) return `${$triggerwidth}px`;

    return `${Math.max($triggerwidth, $contentwidth)}px`;
  }};
  height: fit-content;
  max-height: 80vh;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all 300ms ease-in;
  box-sizing: content-box;
  padding: 0 24px;
  padding-bottom: ${(props) => (props.$isexpanded ? '32px' : '')};

  border: 1px solid red;
`;

export const Trigger = styled.div`
  width: fit-content;
  white-space: nowrap;

  border: 1px solid blue;
`;

export const Content = styled.div<ContentProps>`
  width: fit-content;
  max-height: ${(props) => (props.$isexpanded ? '43rem' : '0px')};
  overflow: hidden;
  transition: all 300ms ease-in;

  border: 1px solid black;
`;
