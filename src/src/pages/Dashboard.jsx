// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import WalletBalance from "../components/WalletBalance";
import WithdrawForm from "../components/WithdrawForm";
import WithdrawHistory from "../components/WithdrawHistory";

export default function Dashboard() {
  const [balance, setBalance] = useState(5000); // real app: fetch from API
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete Task A", reward: 100 },
    { id: 2, title: "Complete Task B", reward: 200 }
  ]);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("withdraw_history")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("withdraw_history", JSON.stringify(history));
  }, [history]);

  const handleSuccessfulWithdraw = (amount, paypalResponse) => {
    // update local balance + history
    setBalance(prev => Math.max(0, prev - Number(amount)));
    const entry = {
      id: "w_" + Date.now(),
      amount: Number(amount),
      method: "PayPal",
      to: paypalResponse?.items?.[0]?.receiver || paypalResponse?.receiver || "n/a",
      status: "completed",
      createdAt: new Date().toISOString(),
      raw: paypalResponse
    };
    setHistory(prev => [entry, ...prev].slice(0, 20));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Reload Shopify Mall — Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WalletBalance balance={balance} />
          <section>
            <h2 className="text-xl font-semibold mb-3">Tasks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tasks.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">Withdraw</h2>
            <WithdrawForm
              balance={balance}
              onSuccess={(amount, paypalResponse) => handleSuccessfulWithdraw(amount, paypalResponse)}
            />
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-3">Recent Withdrawals</h2>
            <WithdrawHistory history={history} />
          </div>
        </aside>
      </div>
    </div>
  );
}
