import React, { useEffect, useState } from 'react';
import { Layout } from '@components/layout/layout.component';
import css from './results.module.css';
import { ResultsHeader } from './profile-header/results-header.component';
import { useGetTasksListRequest } from '@api/routes/get-tasks-list';
import { useGetWinnersListRequest } from '@api/routes/get-winners-list';
import { Select } from '@components/ui-kit/select/select.component';
import { Option } from '@components/ui-kit/select/option/option.component';
import { Button } from '@components/ui-kit/button/button.component';
import { useStartTaskMutation } from '@api/routes/start-task';
import { BASE_HOSTNAME } from '@api/constants/base';

export const Results: React.FC = () => {
    const { data: taskList } = useGetTasksListRequest();
    const { mutate, data } = useGetWinnersListRequest();
    const { mutateAsync: startTaskMutate } = useStartTaskMutation();

    const [taskId, setTaskId] = useState<string[]>();
    const [currentTaskId, setCurrentTaskId] = useState<string>();
    useEffect(() => setTaskId(taskList?.map(task => task.id)), [taskList]);

    return (
        <div className={css.page}>
            <Layout withNav />
            <ResultsHeader />

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Select
                    value={taskId?.[0] ?? ''}
                    onChange={taskId => {
                        setCurrentTaskId(taskId);
                        mutate({ taskId: taskId });
                    }}
                >
                    {taskList?.map(task => (
                        <Option name={task?.id ?? 'test'}>{task?.name ?? 'test'}</Option>
                    )) ?? <Option name="fdf">gf</Option>}
                </Select>
            </div>

            <div className={css['results__container']}>
                {data?.map((el, index) => (
                    <div className={css.resultsItem}>
                        <h3>
                            {index + 1}) {el.name}
                        </h3>
                        <div className={css['resultsItem__container']}>
                            <span>
                                Вхождение грамматики пользователя в эталонную:{' '}
                                {el.result.idealPercent ? el.result.idealPercent + '%' : '-'}
                            </span>
                            <span>
                                Вхождение эталонной грамматики в грамматику пользователя:{' '}
                                {el.result.userGrammarPercent ? el.result.userGrammarPercent + '%' : '-'}
                            </span>
                            <span>Количество правил в грамматике: {el.result.grammarLong}</span>
                            <span>
                                Количество нетерминальных символов в грамматике:{' '}
                                {el.result.uniqueNonTerminals}
                            </span>

                            <span>Пройдена автоматическая проверка: {el.isResultVerify ? 'Да' : 'Нет'}</span>
                        </div>
                        <Button
                            size="default"
                            className={css['show-result-button']}
                            onClick={async () => {
                                const data = await startTaskMutate({
                                    taskId: currentTaskId ?? '',
                                    loggedAs: el.userId
                                });

                                window.location.href =
                                    BASE_HOSTNAME + ':' + data?.url + '?token=' + data?.token;
                            }}
                        >
                            Посмотреть решение
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};