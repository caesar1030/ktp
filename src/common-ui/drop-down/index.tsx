import {
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as S from './styles';

interface DropDownProps {
  children: ReactNode;
}

interface TriggerProps {
  children: ReactNode;
}

interface ContentProps {
  children: ReactNode;
}

interface DropDownContextType {
  triggerRef: MutableRefObject<HTMLDivElement | null>;
  contentRef: MutableRefObject<HTMLDivElement | null>;
  setContentWidth: (num: number) => void;
  setTriggerWidth: (num: number) => void;
  isExpanded: boolean;
  toggleExpanded: () => void;
}

const DropDownContext = createContext<DropDownContextType>(null!);

const DropDown = ({ children }: DropDownProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentWidth, setContentWidth] = useState(0);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <DropDownContext.Provider
      value={{
        isExpanded,
        triggerRef,
        contentRef,
        setContentWidth,
        setTriggerWidth,
        toggleExpanded,
      }}
    >
      <S.DropDown
        $contentwidth={contentWidth}
        $triggerwidth={triggerWidth}
        $isexpanded={isExpanded}
      >
        {children}
      </S.DropDown>
    </DropDownContext.Provider>
  );
};

const Trigger = ({ children }: TriggerProps) => {
  const context = useContext(DropDownContext);
  if (!context) throw new Error('Trigger가 DropDown컴포넌트 외부에서 사용');

  const { triggerRef, setTriggerWidth, toggleExpanded } = context;

  useEffect(() => {
    if (!triggerRef.current) return;
    setTriggerWidth(triggerRef.current.offsetWidth);
  }, [setTriggerWidth, triggerRef]);

  return (
    <S.Trigger ref={triggerRef} onClick={toggleExpanded}>
      {children}
    </S.Trigger>
  );
};

const Content = ({ children }: ContentProps) => {
  const context = useContext(DropDownContext);
  if (!context) throw new Error('Trigger가 DropDown컴포넌트 외부에서 사용');

  const { setContentWidth, contentRef, isExpanded } = context;

  useEffect(() => {
    if (!contentRef.current) return;
    setContentWidth(contentRef.current.offsetWidth);
  }, [contentRef, setContentWidth]);

  return (
    <S.Content $isexpanded={isExpanded} ref={contentRef}>
      {children}
    </S.Content>
  );
};

DropDown.Trigger = Trigger;
DropDown.Content = Content;

export default DropDown;
