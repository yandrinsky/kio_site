import { useMeRequest } from '@api/index';
import { UserInputField } from '@components/user-profile-fields/user-input-field/user-input-field.component';
import React from 'react';
import { getValidationResult, parseFullName } from './full-name-field.utils';
import { useSetFullNameMutation } from '@api/routes/set-full-name';

export const FullNameField: React.FC = () => {
  const { data } = useMeRequest();
  const { mutate } = useSetFullNameMutation();

  const fullName = `${data?.surname} ${data?.name} ${data?.patronymic}`;

  return (
    <UserInputField
      title="Ваше имя"
      subtitle="Это ваше полное имя"
      footerText="Введите ваше ФИО (отчество при наличии)"
      isChangeableInfo
      value={fullName}
      validate={value => getValidationResult(parseFullName(value))}
      onSave={value => mutate(parseFullName(value))}
    />
  );
};
