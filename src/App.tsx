import DropDown from './common-ui/drop-down';
import GlobalStyles from './styles/global-styles';
import HomeBanner from './common-ui/home-banner';

const App = () => {
  return (
    <>
      <GlobalStyles />

      <HomeBanner />

      <DropDown>
        <DropDown.Trigger>
          <span>도입문의</span>
        </DropDown.Trigger>
        <DropDown.Content>
          <div>컨텐츠</div>
        </DropDown.Content>
      </DropDown>
    </>
  );
};

export default App;
