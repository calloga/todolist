import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../features/taskSlice";

interface Task {
  title: string;
  description: string;
  status: boolean;
}

interface AddTaskProps {
  initialTask?: Task;
}

const AddTask: FC<AddTaskProps> = ({
  initialTask = { title: "", description: "", status: false },
}) => {
  const [task, setTask] = useState(initialTask);

  const dispatch = useDispatch();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addTask(task));
    setTask({ title: "", description: "", status: false });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="form-title">New Task</h2>
      <div className="form-entry">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={task.title}
          onChange={handleInputChange}
          className="form-input"
        />
      </div>

      <div className="form-entry">
        <label htmlFor="description" className="form-label">
          Description:
        </label>

        <textarea
          id="description"
          name="description"
          value={task.description}
          onChange={handleInputChange}
          className="form-description"
        />
      </div>

      <button type="submit" className="form-btn">
        Create Task
      </button>
    </form>
  );
};

export default AddTask;
