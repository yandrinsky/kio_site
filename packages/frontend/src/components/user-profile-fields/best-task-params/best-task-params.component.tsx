import { FC, useEffect, useState } from 'react';
import { IBestTaskParams } from './best-task-params';
import { UserInitialField } from '../user-initial-field/user-initial-field.component';
import { Button } from '@components/ui-kit/button/button.component';
import css from './best-task-params.module.css';
import { RateTaskItem } from './rate-task-item/rate-task-item.component';

export const BestTaskParams: FC<IBestTaskParams> = ({ title, subtitle, value, onSave }) => {
    const [state, setState] = useState(value?.map(el => ({ ...el, isSave: true })) ?? []);

    const UserTextareaButton = (
        <Button
            type="button"
            onClick={() =>
                setState(state => [
                    ...state,
                    {
                        name: undefined,
                        rate: undefined,
                        equalItem: undefined,
                        comparisonMethod: undefined,
                        isSave: false
                    }
                ])
            }
            theme="accent"
        >
            Добавить
        </Button>
    );

    return (
        <UserInitialField title={title} subtitle={subtitle} Button={UserTextareaButton}>
            {state.length ? (
                <div className={css['rate-task__container']}>
                    {state.map((el, index) => (
                        <RateTaskItem
                            key={`${el.name}_${index}`}
                            name={el.name}
                            rate={el.rate}
                            equalItem={el.equalItem}
                            comparisonMethod={el.comparisonMethod}
                            index={index}
                            ratesTaskParams={state}
                            isSave={el.isSave}
                            onSave={onSave}
                            setTask={setState}
                        />
                    ))}
                </div>
            ) : (
                <div className={css['text']}>Параметров оценивания пока нет</div>
            )}
        </UserInitialField>
    );
};
