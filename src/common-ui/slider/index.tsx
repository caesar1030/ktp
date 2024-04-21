import {
  Children,
  MutableRefObject,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as S from './styles';
import useInterval from '../../hooks/use-interval';

interface SliderProps {
  children: ReactNode;
}

interface SlidesContainerProps {
  children: ReactNode[];
}

interface SlideProps {
  children: ReactNode;
}

interface LeftButtonProps {
  children: ReactNode;
}

interface RightButtonProps {
  children: ReactNode;
}

interface SlideContextType {
  move: (direction: keyof typeof Directions) => void;
  slidesContainerRef: MutableRefObject<HTMLDivElement>;
  totalLengthRef: MutableRefObject<number>;
  slideIndex: number;
}
const SliderContext = createContext<SlideContextType>(null!);

const Directions = {
  LEFT: -1,
  RIGHT: 1,
} as const;
const AUTO_SLIDE_TERM = 5000;

const Slider = ({ children }: SliderProps) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slidesContainerRef = useRef<HTMLDivElement>(null!);
  const totalLengthRef = useRef<number>(0);

  const replaceSlideWithoutAnimation = (toReplaceIndex: number) => {
    slidesContainerRef.current.style.transition = 'none';
    slidesContainerRef.current.style.transform = `translateX(-${
      toReplaceIndex * 100
    }%)`;

    requestAnimationFrame(() => {
      slidesContainerRef.current.style.transition = '';
      slidesContainerRef.current.style.transform = '';
    });
  };

  const move = (direction: keyof typeof Directions) => {
    if (!totalLengthRef.current) return;

    const hasToReplace =
      direction === 'LEFT'
        ? slideIndex <= 1
        : slideIndex >= totalLengthRef.current - 2;
    const toReplaceIndex =
      direction === 'LEFT' ? totalLengthRef.current - 1 : 0;

    if (hasToReplace) {
      replaceSlideWithoutAnimation(toReplaceIndex);
      setSlideIndex(toReplaceIndex + Directions[direction]);

      return;
    }

    setSlideIndex((prev) => prev + Directions[direction]);
  };

  useInterval(() => move('RIGHT'), AUTO_SLIDE_TERM);

  return (
    <SliderContext.Provider
      value={{
        move,
        slidesContainerRef,
        totalLengthRef,
        slideIndex,
      }}
    >
      <S.Slider>{children}</S.Slider>
    </SliderContext.Provider>
  );
};

const SlidesContainer = ({ children }: SlidesContainerProps) => {
  const context = useContext(SliderContext);
  if (!context)
    throw new Error('SlidesContainer가 SliderContext 외부에서 사용');

  const { slidesContainerRef, totalLengthRef, slideIndex } = context;
  const slides = [
    Children.toArray(children)[children.length - 1],
    ...Children.toArray(children),
    Children.toArray(children)[0],
  ];

  useEffect(() => {
    totalLengthRef.current = slides.length;
  }, [slides.length, totalLengthRef]);

  return (
    <S.SlidesContainer ref={slidesContainerRef} $slideindex={slideIndex}>
      {slides}
    </S.SlidesContainer>
  );
};

const Slide = ({ children }: SlideProps) => {
  return <S.Slide>{children}</S.Slide>;
};

const LeftButton = ({ children }: LeftButtonProps) => {
  const context = useContext(SliderContext);
  if (!context) throw new Error('LeftButton이 SliderContext 외부에서 사용');

  const { move } = context;

  return <S.LeftButton onClick={() => move('LEFT')}>{children}</S.LeftButton>;
};

const RightButton = ({ children }: RightButtonProps) => {
  const context = useContext(SliderContext);
  if (!context) throw new Error('RightButton이 SliderContext 외부에서 사용');

  const { move } = context;

  return (
    <S.RightButton onClick={() => move('RIGHT')}>{children}</S.RightButton>
  );
};

Slider.SlidesContainer = SlidesContainer;
Slider.Slide = Slide;
Slider.LeftButton = LeftButton;
Slider.RightButton = RightButton;

export default Slider;
