import { useForm } from 'react-hook-form';
import { z } from 'zod';
import contactSchema from '../../schemas/contact-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChangeEvent } from 'react';
import * as S from './styles';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<z.infer<typeof contactSchema>>({
    defaultValues: {
      phone: '',
      email: '',
      consent: false,
    },
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  });

  const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const replacedValue = value.replace(/\D/g, '');
    setValue('phone', replacedValue, { shouldValidate: true });
  };

  const onSubmit = () => {
    alert('도입문의 신청이 완료 되었습니다.');
    reset();
  };

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="phone">연락처</label>
      <S.Input
        type="text"
        id="phone"
        {...register('phone')}
        onChange={handleChangePhone}
      />
      {errors.phone?.message && (
        <S.ErrorMessage>{errors.phone.message}</S.ErrorMessage>
      )}
      <label htmlFor="email">이메일</label>
      <S.Input type="text" id="email" {...register('email')} />
      {errors.email?.message && (
        <S.ErrorMessage>{errors.email.message}</S.ErrorMessage>
      )}
      <S.CheckBoxContainer>
        <S.CheckBox type="checkbox" id="consent" {...register('consent')} />
        <label htmlFor="consent">개인정보 수집 및 이용안내에 동의합니다.</label>
      </S.CheckBoxContainer>
      <S.Button type="submit" $disabled={!isValid}>
        문의하기
      </S.Button>
    </S.Form>
  );
};
export default ContactForm;
