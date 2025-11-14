import TaskCard from "../components/TaskCard";
import WalletBalance from "../components/WalletBalance";
import WithdrawForm from "../components/WithdrawForm";

export default function Dashboard() {
  const userId = "user-123"; // Replace with auth userId
  const tasks = [
    { id: 1, title: "Complete Task A", reward: 100 },
    { id: 2, title: "Complete Task B", reward: 200 }
  ];
  const balance = 500; // Replace with API call

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Reload Shopify Mall Dashboard</h1>
      <WalletBalance balance={balance} />
      <h2 className="text-xl font-semibold mt-6 mb-2">Tasks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map(task => <TaskCard key={task.id} task={task} />)}
      </div>
      <h2 className="text-xl font-semibold mt-6 mb-2">Withdraw</h2>
      <WithdrawForm userId={userId} />
    </div>
  );
}
