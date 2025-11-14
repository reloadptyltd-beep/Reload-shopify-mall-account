export default function TaskCard({ task }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{task.title}</h3>
      <p>Reward: ZAR {task.reward}</p>
    </div>
  );
}
