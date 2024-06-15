import {
    IGetOrderAndType,
    IGetValidationResult,
    IHandleFileChange,
    IHandleToggleChange,
    IRateTaskParams,
    ISortBestResultConfig
} from './update-task';

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
    isApproved,
    updateTaskId,
    isAvailable,
    setIsAvailable,
    updateTaskMutation
}) => {
    isApproved && setIsAvailable(isAvailable);

    updateTaskMutation({
        id: updateTaskId,
        isAvailable: isAvailable
    });
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

export const reverseTransformArray = (outputObj: ISortBestResultConfig) => {
    return Object.entries(outputObj ?? {})?.map(item => {
        const value = item[1];

        return {
            name: item[0],
            rate: value.order,
            equalItem: value.equals,
            comparisonMethod: value.type
        };
    });
};
