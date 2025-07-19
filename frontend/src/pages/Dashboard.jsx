import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBoard, fetchBoards } from "../features/auth/boardsSlice";
import { Link } from "react-router-dom";

function Dashboard() {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [showForm, setShowForm] = useState(false)
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boards.items) // boards = name of reducer in store, items = key in object in initialState of boardsSlice

    useEffect(() => {
        dispatch(fetchBoards());
    }, [dispatch]);

    const handleCreate = () => {
        if(!name.trim()) return;

        dispatch(createBoard({ name, description: desc }));

        setName(""); 
        setDesc(""); 
        setShowForm(false);
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Boards</h2>
            <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setShowForm(!showForm)}>
                + Create Board
            </button>
            {showForm && (
                <div className="mb-4 bg-gray-100 text-white p-4 rounded shadow dark:bg-gray-800">
                    <input className="form-input mb-2 w-full border-solid border-2 rounded p-2 focus:text-blue-200" placeholder="Board name" value={name} onChange={e => setName(e.target.value)} />
                    <input className="form-input mb-2 w-full border-solid border-2 rounded p-2 focus:text-blue-200" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
                    <button className="px-3 py-1 bg-green-600 text-white rounded" onClick={handleCreate}>Create</button>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {boards.map(board => (
                    <Link key={board.id} to={`/board/${board.id}`} className="block p-4 bg-white dark:bg-gray-700 rounded shadow hover:shadow-lg transition">
                        <h3 className="text-lg font-semibold">{board.name}</h3>
                        <p className="text-gray-600">{board.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;