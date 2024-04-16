import { FC, useEffect, useState } from 'react';
import { IUserTextareaField } from './user-textarea-field';
import { UserInitialField } from '../user-initial-field/user-initial-field.component';
import { Button } from '@components/ui-kit/button/button.component';
import css from './user-textarea-field.module.css';
import { Textarea } from '@components/ui-kit/textarea/textarea.components';

export const UserTextareaField: FC<IUserTextareaField> = ({
  title,
  subtitle,
  footerText,
  value,
  validate,
  onSave
}) => {
  const [state, setState] = useState(value);
  const [isError, setIsError] = useState(false);

  const validationResult = validate?.(state);

  useEffect(() => {
    changeState(value);
  }, [value]);

  const changeState = (value: any) => {
    setState(value);
    validate && setIsError(validate?.(value) !== true);
  };

  const UserTextareaButton = (
    <Button type="button" onClick={() => !isError && onSave.call(this, state)} theme="accent">
      Сохранить
    </Button>
  );

  return (
    <UserInitialField title={title} subtitle={subtitle} footerText={footerText} Button={UserTextareaButton}>
      <div className={css['user-textarea-field__container']}>
        <Textarea value={state} onChange={e => changeState(e.target.value)} isError={isError} />
        <span className={css['user-textarea-field__error-message']}>
          {isError && typeof validationResult === 'string' && validationResult}
        </span>
      </div>
    </UserInitialField>
  );
};
