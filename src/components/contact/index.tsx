import ContactForm from '../../common-ui/contact-form';
import DropDown from '../../common-ui/drop-down';
import * as S from './styles';
import { createPortal } from 'react-dom';

const Contact = () => {
  return createPortal(
    <S.Contact>
      <DropDown>
        <DropDown.Trigger>
          <S.Button>도입문의</S.Button>
        </DropDown.Trigger>
        <DropDown.Content>
          <ContactForm />
        </DropDown.Content>
      </DropDown>
    </S.Contact>,
    document.body
  );
};

export default Contact;
