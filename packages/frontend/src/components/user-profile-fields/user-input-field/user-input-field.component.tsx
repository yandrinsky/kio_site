import { FC, useEffect, useState } from 'react';
import { IUserInputField } from './user-input-field';
import { UserInitialField } from '../user-initial-field/user-initial-field.component';
import { Input } from '@components/ui-kit/input/input.components';
import { Button } from '@components/ui-kit/button/button.component';
import css from './user-input-field.module.css';

export const UserInputField: FC<IUserInputField> = ({
    title,
    subtitle,
    footerText,
    value,
    isEditable: isEditableProp,
    buttonText,
    validate,
    onChangeInput,
    onSave
}) => {
    const [state, setState] = useState(value);
    const [isChanging, setIsChanging] = useState(!Boolean(isEditableProp));
    const [isError, setIsError] = useState(false);

    const validationResult = validate?.(state);

    useEffect(() => {
        changeState(value);
    }, [value]);

    const changeState = (value: any) => {
        setState(value);
        validate && setIsError(validate?.(value) !== true);
        onChangeInput?.(value);
    };

    const UserInputButton = onSave && (
        <Button
            type="button"
            onClick={() => {
                !isError && Boolean(isEditableProp) && setIsChanging(state => !state);
                !isError && onSave?.call(this, state);
            }}
            theme="accent"
        >
            {buttonText ?? 'Сохранить'}
        </Button>
    );

    return (
        <UserInitialField
            title={title}
            subtitle={subtitle}
            footerText={footerText}
            Button={UserInputButton}
            isChanging={isChanging}
            setIsChanging={setIsChanging}
        >
            <div className={css['user-input-field__container']}>
                <Input
                    disabled={!isChanging}
                    value={state}
                    onChange={e => changeState(e.target.value)}
                    isError={isError}
                />
                <span className={css['user-input-field__error-message']}>
                    {isError && typeof validationResult === 'string' && validationResult}
                </span>
            </div>
        </UserInitialField>
    );
};
