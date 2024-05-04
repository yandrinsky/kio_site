import { IHandleFileChange } from './update-task';

export const handleFileChange: IHandleFileChange = ({ event, updateTaskId, updateTaskMutation }) => {
  const file = event.target.files![0];

  updateTaskMutation({
    id: updateTaskId!,
    preview: file
  });
};
