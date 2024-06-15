import React from 'react';
import { Input } from '@components/ui-kit/input/input.components';
import { Select } from '@components/ui-kit/select/select.component';
import { Option } from '@components/ui-kit/select/option/option.component';
import { Button } from '@components/ui-kit/button/button.component';
import css from './rate-task-item.module.css';
import { useState } from 'react';
import { IRateTaskItem } from './rate-task-item';
import { comparisonMethodsMapper } from './rate-task-item.utils';

export const RateTaskItem: React.FC<IRateTaskItem> = ({
    name: nameProp,
    rate: rateProp,
    equalItem: equalItemProp,
    comparisonMethod: comparisonMethodProp,
    index,
    ratesTaskParams: ratesTaskProp,
    isSave,
    onSave,
    setTask
}) => {
    const [name, setName] = useState(nameProp);
    const [rate, setRate] = useState<undefined | number>(rateProp);
    const [equalItem, setEqualItem] = useState<undefined | string | number>(equalItemProp);
    const comparisonMethods = ['description', 'min', 'max', 'equals'];
    const [comparisonMethod, setComparisonMethod] = useState(comparisonMethodProp ?? comparisonMethods[0]);
    const [status, setStatus] = useState(isSave ? '/check-mark.svg' : '/cross.svg');

    let ratesTask = ratesTaskProp;

    return (
        <div className={css['best-task-item__container']}>
            <img width="48" height="48" src={status} alt="status" />

            <div className={css['container']}>
                <div className={css['input-container']}>
                    <Input
                        placeholder="Имя параметра оценки..."
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    :
                    <Input
                        placeholder="Важность"
                        type="number"
                        value={rate}
                        onChange={e => setRate(Math.abs(Number(e.target.value)))}
                    />
                </div>

                <div className={css['equals-content']}>
                    <Select
                        value={comparisonMethod}
                        onChange={method =>
                            method === 'description' ? setComparisonMethod('') : setComparisonMethod(method)
                        }
                    >
                        {comparisonMethods.map(method => (
                            <Option key={method} name={method}>
                                {comparisonMethodsMapper[method as keyof typeof comparisonMethodsMapper]}
                            </Option>
                        ))}
                    </Select>

                    {comparisonMethod === 'equals' && (
                        <Input
                            placeholder="Введите значение..."
                            value={equalItem}
                            onChange={e => setEqualItem(e.target.value)}
                        />
                    )}
                </div>
            </div>

            <div className={css['buttons']}>
                <Button
                    type="button"
                    disabled={
                        !name ||
                        !rate ||
                        (!equalItem && comparisonMethod === 'equals') ||
                        comparisonMethod === 'description'
                    }
                    onClick={() => {
                        comparisonMethod === 'equals'
                            ? (ratesTask[index] = {
                                  name: name,
                                  rate: rate,
                                  equalItem: equalItem,
                                  comparisonMethod: comparisonMethod,
                                  isSave: true
                              })
                            : (ratesTask[index] = {
                                  name: name,
                                  rate: rate,
                                  comparisonMethod: comparisonMethod,
                                  isSave: true
                              });
                        setStatus('/check-mark.svg');
                        console.log('click', status);
                        onSave?.(ratesTask);
                    }}
                >
                    Сохранить
                </Button>

                <Button
                    type="button"
                    onClick={() => {
                        setTask(ratesTask.filter((el, elIndex) => index !== elIndex));
                        isSave && onSave?.(ratesTask.filter((el, elIndex) => index !== elIndex));
                    }}
                    theme="colored-red"
                >
                    Удалить
                </Button>
            </div>
        </div>
    );
};
