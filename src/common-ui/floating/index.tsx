import ContactForm from '../contact-form';
import DropDown from '../drop-down';
import * as S from './styles';
import { createPortal } from 'react-dom';

const Floating = () => {
  return createPortal(
    <S.Floating>
      <DropDown>
        <DropDown.Trigger>
          <S.Button>도입문의</S.Button>
        </DropDown.Trigger>
        <DropDown.Content>
          <ContactForm />
        </DropDown.Content>
      </DropDown>
    </S.Floating>,
    document.body
  );
};

export default Floating;
