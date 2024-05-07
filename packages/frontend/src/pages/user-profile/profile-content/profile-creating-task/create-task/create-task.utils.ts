import { IHandleFileChange, IHandleOnSubmit } from './create-task';

export type IGetValidationResult = (props: {
    value: string;
    type: 'description' | 'taskName';
}) => boolean | string;

export const getValidationResult: IGetValidationResult = ({ value, type }) => {
    if (type === 'taskName') {
        return value?.length < 2 ? 'Название должно быть больше 1 символа' : true;
    }

    return value?.length < 1 ? 'Это поле обязательное для заполнения' : true;
};

export const handleFileChange: IHandleFileChange = ({ event, setPreviewFile, setPreview }) => {
    const file = event.target.files![0];

    setPreviewFile(file);

    const reader = new FileReader();
    reader.onload = () => {
        if (typeof reader.result === 'string') {
            setPreview(reader.result);
        }
    };
    reader.readAsDataURL(file);
};

export const handleOnSubmit: IHandleOnSubmit = ({
    createTaskMutation,
    setIsTaskCreated,
    taskName,
    description,
    settings,
    previewFile
}) => {
    createTaskMutation({
        name: taskName,
        description: description,
        settings: settings,
        preview: previewFile
    });
    setIsTaskCreated(true);
};
