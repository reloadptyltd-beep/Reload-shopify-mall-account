// src/components/WithdrawHistory.jsx
export default function WithdrawHistory({ history = [] }) {
  if (!history.length) return <div className="text-sm text-gray-600">No withdrawals yet.</div>;

  return (
    <ul className="space-y-3">
      {history.map(item => (
        <li key={item.id} className="p-3 border rounded flex justify-between items-center">
          <div>
            <div className="text-sm font-medium">ZAR {item.amount}</div>
            <div className="text-xs text-gray-500">{item.method} • {item.to}</div>
            <div className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</div>
          </div>
          <div className="text-sm text-green-600">{item.status}</div>
        </li>
      ))}
    </ul>
  );
}
