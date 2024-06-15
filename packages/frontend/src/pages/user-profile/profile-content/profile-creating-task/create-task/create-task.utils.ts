import {
    IGetOrderAndType,
    IGetValidationResult,
    IHandleFileChange,
    IHandleOnSubmit,
    IRateTaskParams,
    ISortBestResultConfig
} from './create-task';

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

export const transformArray = (rateTaskParams: IRateTaskParams[]) => {
    let outputObj: ISortBestResultConfig = {};

    const getOrderAndType: IGetOrderAndType = ({ comparisonMethod, rate, equalItem }) => {
        const order = rate;
        const type = comparisonMethod;
        const equals = equalItem;

        return { type, order, equals };
    };

    rateTaskParams.forEach((item, index) => {
        const { name, comparisonMethod, rate, equalItem } = item;
        if (equalItem) {
            const { type, order, equals } = getOrderAndType({
                comparisonMethod: comparisonMethod!,
                rate: rate!,
                equalItem
            });
            outputObj[name!] = {
                type,
                order,
                equals
            };
        } else {
            const { type, order } = getOrderAndType({ comparisonMethod: comparisonMethod!, rate: rate! });
            outputObj[name!] = {
                type,
                order
            };
        }
    });

    return outputObj;
};
