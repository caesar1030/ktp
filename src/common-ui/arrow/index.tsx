import leftArrowImg from '../../assets/arrow-left.png';
import rightArrowImg from '../../assets/arrow-right.png';
import * as S from './styles';

interface ArrowProps {
  direction: keyof typeof images;
}

const images = {
  left: leftArrowImg,
  right: rightArrowImg,
};

const Arrow = ({ direction }: ArrowProps) => {
  const image = images[direction];

  return <S.Arrow src={image} />;
};

export default Arrow;
