export default function TaskCard({ task }) {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded shadow hover:shadow-md transition">
      <h3 className="font-bold text-lg">{task.title}</h3>
      <p>{task.description}</p>
      {/* buttons for edit, comment, move, to be added*/}
    </div>
  );
}
