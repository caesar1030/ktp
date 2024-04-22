import Slider from '../../common-ui/slider';
import * as S from './styles';
import smallDutyFreeImg from '../../assets/duty-free-small.webp';
import dutyFreeImg from '../../assets/duty-free.webp';
import smallHospitalImg from '../../assets/hospital-small.webp';
import hospitalImg from '../../assets/hospital.webp';
import smallPaymentImg from '../../assets/payment-small.webp';
import paymentImg from '../../assets/payment.webp';
import Arrow from '../../common-ui/arrow';

const images = [
  {
    small: smallDutyFreeImg,
    large: dutyFreeImg,
  },
  {
    small: smallPaymentImg,
    large: paymentImg,
  },
  {
    small: smallHospitalImg,
    large: hospitalImg,
  },
];

const HomeBanner = () => {
  return (
    <S.HomeBanner>
      <Slider>
        <Slider.SlidesContainer>
          {images.map(({ small, large }) => {
            return (
              <Slider.Slide key={small + large}>
                <S.Image $small={small} $large={large} />
              </Slider.Slide>
            );
          })}
        </Slider.SlidesContainer>

        <Slider.LeftButton>
          <Arrow direction="left" />
        </Slider.LeftButton>
        <Slider.RightButton>
          <Arrow direction="right" />
        </Slider.RightButton>
      </Slider>
    </S.HomeBanner>
  );
};

export default HomeBanner;
