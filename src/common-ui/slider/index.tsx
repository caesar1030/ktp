import { Children, ReactNode, useRef, useState } from 'react';
import * as S from './styles';
import useInterval from '../../hooks/use-interval';

interface MyProps {
  children: ReactNode[];
}

const Slider = ({ children }: MyProps) => {
  const [slideIndex, setSlideIndex] = useState(1);
  const slidesWrapperRef = useRef<HTMLDivElement>(null!);

  const slides = [
    Children.toArray(children)[children.length - 1],
    ...Children.toArray(children),
    Children.toArray(children)[0],
  ];

  const fakeLength = slides.length;

  const replaceSlideWithoutAnimation = (toReplaceIndex: number) => {
    if (slidesWrapperRef.current.style.transition === 'none') return;

    slidesWrapperRef.current.style.transition = 'none';
    slidesWrapperRef.current.style.transform = `translateX(-${
      toReplaceIndex * 100
    }%)`;

    requestAnimationFrame(() => {
      slidesWrapperRef.current.style.transition = '';
      slidesWrapperRef.current.style.transform = '';
    });
  };

  const moveLeft = () => {
    if (slideIndex <= 1) {
      replaceSlideWithoutAnimation(fakeLength - 1);
      setSlideIndex(fakeLength - 2);
      return;
    }

    setSlideIndex((prev) => prev - 1);
  };

  // TODO: function으로 바꾸고 useInterval 맨 위로 올릴지? 고민해보기
  const moveRight = () => {
    if (slideIndex >= fakeLength - 2) {
      replaceSlideWithoutAnimation(0);
      setSlideIndex(1);
      return;
    }

    setSlideIndex((prev) => prev + 1);
  };

  useInterval(moveRight, 2000);

  return (
    <S.Slider>
      <S.SlidesContainer ref={slidesWrapperRef} $slideindex={slideIndex}>
        {slides.map((slide, idx) => (
          <S.Slide key={idx}>{slide}</S.Slide>
        ))}
      </S.SlidesContainer>

      <S.LeftButton onClick={() => moveLeft()}> {'<'}</S.LeftButton>
      <S.RightButton onClick={() => moveRight()}> {'>'}</S.RightButton>
    </S.Slider>
  );
};

export default Slider;
