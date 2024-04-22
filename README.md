# KTP 기술 과제

### 무한 슬라이더 문제 해결 과정

- 마지막 슬라이드와 첫 슬라이드를 각각 처음과 마지막에 복제하였습니다.

```typescript
const slides = [
  Children.toArray(children)[children.length - 1],
  ...Children.toArray(children),
  Children.toArray(children)[0],
];
```

- 바운더리(왼쪽으로 슬라이드 하는 경우 첫번째 슬라이드, 오른쪽으로 슬라이드 하는 경우 마지막 슬라이드)에 도착하는 경우 복제해놓은 슬라이드로 이동하게 됩니다.
- 이 때 인라인 스타일을 통해 잠시 transition을 제거(override)하였습니다.
- 다음 프레임에는 다시 transition을 복원하여야 하기 때문에 raf를 사용하여 인라인 스타일을 제거하여 styled-components에 지정해놓은 transition이 적용되도록 하였습니다.
- setState는 비동기처럼 동작하고 몇 프레임 후에 실제로 새로운 상태가 commit이 될지 예측하기 어렵기 때문에, 바운더리로 이동한 후 다음 프레임 이후에는 항상 transition이 적용되도록 raf를 사용하였습니다.

```typescript
const hasToReplace =
  direction === 'LEFT'
    ? slideIndex <= 1
    : slideIndex >= totalLengthRef.current - 2;
const toReplaceIndex = direction === 'LEFT' ? totalLengthRef.current - 1 : 0;

if (hasToReplace) {
  replaceSlideWithoutAnimation(toReplaceIndex);
  setSlideIndex(toReplaceIndex + Directions[direction]);

  return;
}
```

```typescript
const replaceSlideWithoutAnimation = (toReplaceIndex: number) => {
  slidesContainerRef.current.style.transition = 'none';
  slidesContainerRef.current.style.transform = `translateX(-${
    toReplaceIndex * 100
  }%)`;

  requestAnimationFrame(() => {
    slidesContainerRef.current.style.transition = '';
    slidesContainerRef.current.style.transform = '';
  });
};
```

- 유사한 아이디어로 raf를 사용하여 useInterval 커스텀 훅을 제작하여 5초마다 자동 슬라이드가 되도록 구현하였습니다.

```typescript
useEffect(() => {
  const tick = (time: number) => {
    const timeDifference = time - lastTimeRef.current;
    if (timeDifference >= term) {
      callback();
      lastTimeRef.current = time;
    }

    frameRef.current = requestAnimationFrame(tick);
  };

  frameRef.current = requestAnimationFrame(tick);

  return () => {
    if (!frameRef.current) return;

    cancelAnimationFrame(frameRef.current);
  };
}, [term, callback]);
```

```typescript
useInterval(() => move('RIGHT'), AUTO_SLIDE_TERM);
```

- 또한, slider 컴포넌트가 composition을 통해 다양한 곳에서 slider 컴포넌트를 재사용할 수 있도록 compound component 패턴을 활용하였습니다.

```typescript
const Slider = ({ children }: SliderProps) => { ... };

const SlidesContainer = ({ children }: SlidesContainerProps) => { ... };

const Slide = ({ children }: SlideProps) => { ... };

const LeftButton = ({ children }: LeftButtonProps) => { ... };

const RightButton = ({ children }: RightButtonProps) => { ... };

Slider.SlidesContainer = SlidesContainer;
Slider.Slide = Slide;
Slider.LeftButton = LeftButton;
Slider.RightButton = RightButton;

export default Slider;
```

### 도입문의 문제 해결 과정

- dropdown 컴포넌트 역시 마찬가지로 compound component를 사용하여 다양한 곳에서 재사용 가능한 공용 컴포넌트로 구현하였습니다.

```typescript
const Trigger = ({ children }: TriggerProps) => {
  const context = useContext(DropDownContext);
  if (!context) throw new Error('Trigger가 DropDown컴포넌트 외부에서 사용');

  const { triggerRef, setTriggerWidth, toggleExpanded } = context;

  useEffect(() => {
    if (!triggerRef.current) return;
    setTriggerWidth(triggerRef.current.offsetWidth);
  }, [setTriggerWidth, triggerRef]);

  return (
    <S.Trigger ref={triggerRef} onClick={toggleExpanded}>
      {children}
    </S.Trigger>
  );
};

const Content = ({ children }: ContentProps) => {
  const context = useContext(DropDownContext);
  if (!context) throw new Error('Trigger가 DropDown컴포넌트 외부에서 사용');

  const { setContentWidth, contentRef, isExpanded } = context;

  useEffect(() => {
    if (!contentRef.current) return;
    setContentWidth(contentRef.current.offsetWidth);
  }, [contentRef, setContentWidth]);

  return (
    <S.Content $isexpanded={isExpanded} ref={contentRef}>
      {children}
    </S.Content>
  );
};
```

- zod로 validation을 하고, react hook form으로 폼의 상태 관리를 하여 관심사를 분리했습니다.

```typescript
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
```

```typescript
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
```
