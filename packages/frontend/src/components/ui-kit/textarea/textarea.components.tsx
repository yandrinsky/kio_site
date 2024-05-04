import React, { FC, memo } from 'react';
import { ITextarea } from './textarea';
import { clx } from '@utils/clx';

import css from './textarea.module.css';
import { propsAreEqual } from '@utils/propsAreEqual';

export const Textarea: FC<ITextarea> = memo(({ className, stretch, isError, value, ...props }) => {
  return (
    <textarea
      className={clx(className, css.textarea, {
        [css.textarea_stretch]: stretch,
        [css.textarea_error]: isError
      })}
      placeholder="Начните писать..."
      value={value ?? ''}
      {...props}
    />
  );
}, propsAreEqual);

Textarea.displayName = 'memo(Textarea)';
