import { IGetValidationResult, IHandleFileChange, IHandleToggleChange } from './update-task';

export const getValidationResult: IGetValidationResult = ({ value, type }) => {
    if (type === 'taskName') {
        return value?.length < 2 ? 'Название должно быть больше 1 символа' : true;
    } else if (type === 'description') {
        return value?.length < 1 ? 'Это поле обязательное для заполнения' : true;
    }

    try {
        const obj = JSON.parse(value);

        return typeof obj === 'object' && true;
    } catch (error) {
        if (value === undefined) {
            return true;
        }

        return 'Введите настройки в формате JSON';
    }
};

export const handleFileChange: IHandleFileChange = ({ event, updateTaskId, updateTaskMutation }) => {
    const file = event.target.files![0];

    updateTaskMutation({
        id: updateTaskId,
        preview: file
    });
};

export const handleToggleChange: IHandleToggleChange = ({
    updateTaskId,
    isAvailable,
    setIsAvailable,
    updateTaskMutation
}) => {
    console.log('HERE', isAvailable);
    setIsAvailable(isAvailable);

    updateTaskMutation({
        id: updateTaskId,
        isAvailable: isAvailable
    });
};
