import { z } from 'zod';

const contactSchema = z.object({
  phone: z
    .string()
    .min(1, '연락처는 필수 항목입니다.')
    .min(7, '연락처 형식에 맞지 않습니다. 다시 입력해주세요.')
    .max(12, '연락처 형식에 맞지 않습니다. 다시 입력해주세요.')
    .regex(/^\d+$/, '연락처는 숫자만 포함해야 합니다.'),
  email: z
    .string()
    .min(1, '이메일은 필수 항목입니다.')
    .email('이메일 형식이 올바르지 않습니다.'),
  consent: z.boolean().refine((val) => val === true),
});

export default contactSchema;
