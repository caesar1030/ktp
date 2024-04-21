import { Children, ReactNode, useRef, useState } from 'react';
import * as S from './styles';
import useInterval from '../../hooks/use-interval';

interface SliderProps {
  children: ReactNode[];
}

const AUTO_SLIDE_TERM = 5000;
const Directions = {
  LEFT: -1,
  RIGHT: 1,
} as const;

const Slider = ({ children }: SliderProps) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slidesWrapperRef = useRef<HTMLDivElement>(null!);

  const slides = [
    Children.toArray(children)[children.length - 1],
    ...Children.toArray(children),
    Children.toArray(children)[0],
  ];

  const fakeLength = slides.length;

  const replaceSlideWithoutAnimation = (toReplaceIndex: number) => {
    slidesWrapperRef.current.style.transition = 'none';
    slidesWrapperRef.current.style.transform = `translateX(-${
      toReplaceIndex * 100
    }%)`;

    requestAnimationFrame(() => {
      slidesWrapperRef.current.style.transition = '';
      slidesWrapperRef.current.style.transform = '';
    });
  };

  const move = (direction: keyof typeof Directions) => {
    const hasToReplace =
      direction === 'LEFT' ? slideIndex <= 1 : slideIndex >= fakeLength - 2;
    const toReplaceIndex = direction === 'LEFT' ? fakeLength - 1 : 0;

    if (hasToReplace) {
      replaceSlideWithoutAnimation(toReplaceIndex);
      setSlideIndex(toReplaceIndex + Directions[direction]);

      return;
    }

    setSlideIndex((prev) => prev + Directions[direction]);
  };

  useInterval(() => move('RIGHT'), AUTO_SLIDE_TERM);

  return (
    <S.Slider>
      <S.SlidesContainer ref={slidesWrapperRef} $slideindex={slideIndex}>
        {slides.map((slide, idx) => (
          <S.Slide key={idx}>{slide}</S.Slide>
        ))}
      </S.SlidesContainer>

      <S.LeftButton onClick={() => move('LEFT')}> {'<'}</S.LeftButton>
      <S.RightButton onClick={() => move('RIGHT')}> {'>'}</S.RightButton>
    </S.Slider>
  );
};

export default Slider;
