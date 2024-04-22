import styled from 'styled-components';

interface SDropDownProps {
  $isexpanded: boolean;
  $triggerwidth: number;
  $contentwidth: number;
}

interface SContentProps {
  $isexpanded: boolean;
}

export const DropDown = styled.div<SDropDownProps>`
  width: ${({ $isexpanded, $contentwidth, $triggerwidth }) => {
    if (!$isexpanded) return `${$triggerwidth}px`;

    return `${Math.max($triggerwidth, $contentwidth)}px`;
  }};
  transition: all 300ms ease-in;
  box-sizing: content-box;
  padding: 0 24px;
  padding-bottom: ${(props) => (props.$isexpanded ? '32px' : '')};
`;

export const Trigger = styled.div`
  width: fit-content;
  white-space: nowrap;
`;

export const Content = styled.div<SContentProps>`
  width: fit-content;
  max-height: ${(props) => (props.$isexpanded ? '43rem' : '0px')};
  overflow: hidden;
  transition: all 300ms ease-in 0s;
`;
