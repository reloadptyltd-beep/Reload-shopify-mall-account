import { useState } from "react";

export default function WithdrawForm({ userId }) {
  const [amount, setAmount] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [method, setMethod] = useState("bank");
  const [address, setAddress] = useState("");

  const handleWithdraw = async () => {
    const res = await fetch("/.netlify/functions/withdraw", {
      method: "POST",
      body: JSON.stringify({ userId, amount, branchCode, method, addressOrAccount: address }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    alert(data.status ? "Withdrawal successful!" : "Error: " + data.message);
  };

  return (
    <div className="p-4 bg-white rounded shadow flex flex-col gap-2">
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (ZAR)" className="p-2 border rounded"/>
      {method === "bank" && <input type="text" value={branchCode} onChange={e => setBranchCode(e.target.value)} placeholder="Branch Code" className="p-2 border rounded"/>}
      {method !== "bank" && <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Wallet/Account Address" className="p-2 border rounded"/>}
      <select value={method} onChange={e => setMethod(e.target.value)} className="p-2 border rounded">
        <option value="bank">Bank</option>
        <option value="usdt-trc20">USDT (TRC20)</option>
        <option value="paypal">PayPal</option>
        <option value="skrill">Skrill</option>
      </select>
      <button onClick={handleWithdraw} className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Withdraw</button>
    </div>
  );
}
