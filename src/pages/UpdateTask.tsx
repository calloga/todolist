import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/index";
import { updateTask } from "../features/taskSlice";
import { useLocation, useParams } from "react-router-dom";

interface UpdateTaskProps {}

const UpdateTask: FC<UpdateTaskProps> = () => {
  const dispatch = useDispatch();
  const state = useLocation().state;
  //const taskId = state.id;

  const { id: taskId = "" } = useParams();

  const taskToUpdate = useSelector((state: RootState) =>
    state.tasks.tasks.find((task) => task.id === taskId)
  );

  const [title, setTitle] = useState(taskToUpdate?.title || "");
  const [description, setDescription] = useState(
    taskToUpdate?.description || ""
  );
  const [status, setStatus] = useState(taskToUpdate?.status || false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedTask = {
      id: taskId,
      title,
      description,
      status,
    };
    dispatch(updateTask(updatedTask));
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
          value={title}
          onChange={handleTitleChange}
          className="form-input"
        />
      </div>

      <div className="form-entry">
        <label htmlFor="description" className="form-label">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={handleDescriptionChange}
          className="form-description"
        />
        <label htmlFor="Completed" className="form-label">
          Completed?
        </label>
        <input
          id="completed"
          type="checkbox"
          checked={status}
          onChange={handleStatusChange}
          className="form-checkbox"
        />
      </div>

      <br />
      <button type="submit" className="form-btn">
        Update Task
      </button>
    </form>
  );
};

export default UpdateTask;
