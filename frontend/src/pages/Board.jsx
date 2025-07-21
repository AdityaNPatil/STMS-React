import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, fetchTasks } from "../features/auth/tasksSlice";
import TaskCard from "../components/TaskCard";
import { useParams } from "react-router-dom";

function Board() {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.items);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(fetchTasks(boardId));
  }, [boardId, dispatch]);

  const handleCreateTask = () => {
    dispatch(createTask({ boardId, task: { title, description } }));
    setTitle("");
    setDescription("");
    setShowModal(false);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Board Tasks</h2>

      <button
        className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
        onClick={() => setShowModal(true)}
      >
        + Add Task
      </button>

      {showModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md text-gray-900 dark:text-gray-100">
            <input
              className="mb-3 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

            <textarea
              className="mb-3 w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-300"
              placeholder="Description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <div className="flex gap-3 justify-end">
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                onClick={handleCreateTask}
              >
                Create
              </button>
              <button
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>

  )
}

export default Board
