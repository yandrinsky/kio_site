export interface ITaskCard {
  taskId: string;
  updateTask: (id: string) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
