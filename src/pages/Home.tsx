import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/index";
import Task from "../components/Task";
import { deleteTask } from "../features/taskSlice";

function Home() {
  const taskState = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  return (
    <div>
      {taskState &&
        taskState.tasks.map((task: any) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            onDelete={() => handleDelete(task.id)}
          />
        ))}
    </div>
  );
}

export default Home;
