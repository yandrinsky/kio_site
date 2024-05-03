import type { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

export interface ITextarea
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  stretch?: boolean;
  isError?: boolean;
}
