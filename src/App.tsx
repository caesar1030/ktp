// import Slider from './common-ui/slider';

import Slider from './common-ui/slider';

const App = () => {
  return (
    <Slider>
      <Slider.SlidesContainer>
        <Slider.Slide>
          <div>slide 1</div>
        </Slider.Slide>
        <Slider.Slide>
          <div>slide 2</div>
        </Slider.Slide>
        <Slider.Slide>
          <div>slide 3</div>
        </Slider.Slide>
      </Slider.SlidesContainer>

      <Slider.LeftButton>{'<'}</Slider.LeftButton>
      <Slider.RightButton>{'>'}</Slider.RightButton>
    </Slider>
  );
};

export default App;
