import { useCreateTaskMutation } from '@api/routes/create-task';
import { useGetCreatedTasksListRequest } from '@api/routes/get-created-tasks-list';
import { useUploadTaskSourceMutation } from '@api/routes/upload-task-source';
import { useState } from 'react';
import { IUseCreateTask } from './create-task';

export const useCreateTask: IUseCreateTask = () => {
    const {
        mutate: createTaskMutation,
        isError: isCreateTaskMutationError,
        isLoading: isCreateTaskMutationLoading
    } = useCreateTaskMutation();
    const { data: taskList } = useGetCreatedTasksListRequest();
    const { mutate: uploadTaskSourceMutation, isError, isLoading } = useUploadTaskSourceMutation();

    const [isTaskCreated, setIsTaskCreated] = useState(false);

    const createdTaskId = taskList?.[taskList.length - 1]?.id;

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [preview, setPreview] = useState('');
    const [settings, setSettings] = useState('');
    const [previewFile, setPreviewFile] = useState<File>();

    const isRequiredFieldsFilled = Boolean(taskName && description && settings);
    const isUploadTaskSourceVisible =
        isTaskCreated && !isCreateTaskMutationError && !isCreateTaskMutationLoading;

    return {
        createTaskMutation,
        setIsTaskCreated,
        createdTaskId,
        uploadTaskSourceMutation,
        isError,
        isLoading,
        taskName,
        setTaskName,
        description,
        setDescription,
        preview,
        setPreview,
        previewFile,
        setPreviewFile,
        isRequiredFieldsFilled,
        isUploadTaskSourceVisible,
        settings,
        setSettings
    };
};
