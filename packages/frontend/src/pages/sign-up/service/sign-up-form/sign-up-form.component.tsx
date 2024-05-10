import { FC } from 'react';
import { ISignUpFormProps } from './sign-up-form';
import UserConnections from '@components/user/user-connections/user-connections';
import { Button } from '@components/ui-kit/button/button.component';

import { capitalize } from '@utils/capitalize';

import css from './sign-up-form.module.css';
import { useToast } from '@hooks/use-toast.hook';
import { Form } from 'react-final-form';
import { InputFormField } from '@components/form/input-form-field/input-form-field.component';

const initialForm = { password: '', fullName: '', passwordRepeat: '', date: '' };

const SignUpForm: FC<ISignUpFormProps> = ({ onSubmit, goBack, isLoading }) => {
    const toast = useToast();

    const handleOnSubmit = (values: typeof initialForm) => {
        if (values.password !== values.passwordRepeat) {
            toast.push({ title: 'Пароли не совпадают', theme: 'error' });
            return { password: true, passwordRepeat: true };
        }

        const fullName = values.fullName.split(' ').filter(Boolean);
        const [year, month, day] = values.date.split('-').map(Number);

        if (!fullName || fullName.length < 2) {
            toast.push({ title: 'Введите полное имя', theme: 'error' });
            return { fullName: true };
        }

        onSubmit({
            password: values.password || '',
            name: fullName[1] || '',
            surname: fullName[0] || '',
            patronymic: fullName[2] || '',
            year,
            month,
            day
        });
    };

    const fullNameMutator = (value: string) => {
        return capitalize(value);
    };

    return (
        <Form onSubmit={handleOnSubmit} initialValues={initialForm}>
            {({ handleSubmit, submitErrors, dirtySinceLastSubmit, ...props }) => (
                <form onSubmit={handleSubmit} className={css['sign-up-form']}>
                    <h2>Регистрация</h2>
                    <InputFormField
                        required
                        placeholder="Ваше ФИО"
                        stretch
                        autoComplete="name"
                        name="fullName"
                        disabled={isLoading}
                        isError={submitErrors?.fullName && !dirtySinceLastSubmit}
                        mutate={fullNameMutator}
                    />
                    <InputFormField
                        required
                        type="password"
                        pattern=".{6,}"
                        title="Шесть или более символов"
                        placeholder="Пароль"
                        stretch
                        disabled={isLoading}
                        name="password"
                        isError={submitErrors?.password && !dirtySinceLastSubmit}
                        autoComplete="new-password"
                    />
                    <InputFormField
                        required
                        type="password"
                        pattern=".{6,}"
                        title="Шесть или более символов"
                        autoComplete="new-password"
                        name="passwordRepeat"
                        disabled={isLoading}
                        isError={submitErrors?.passwordRepeat && !dirtySinceLastSubmit}
                        placeholder="Повтор пароля"
                        stretch
                    />

                    <InputFormField
                        required
                        type="date"
                        pattern=".{6,}"
                        name="date"
                        disabled={isLoading}
                        isError={submitErrors?.passwordRepeat && !dirtySinceLastSubmit}
                        placeholder="Дата рождения"
                        stretch
                    />

                    <div className={css['sign-up-form__buttons']}>
                        <Button onClick={goBack} disabled={isLoading} type="button">
                            Назад
                        </Button>
                        <Button theme="accent" disabled={isLoading} type="submit" stretch>
                            Завершить регистрацию
                        </Button>
                    </div>
                </form>
            )}
        </Form>
    );
};

export default SignUpForm;
