// src/components/WithdrawForm.jsx
import { useState } from "react";

export default function WithdrawForm({ balance = 0, onSuccess }) {
  const [amount, setAmount] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const openConfirm = () => {
    const n = Number(amount);
    if (!n || n <= 0) return setFeedback({ type: "error", message: "Enter a valid amount" });
    if (n > balance) return setFeedback({ type: "error", message: "Insufficient balance" });
    if (!paypalEmail || !paypalEmail.includes("@")) return setFeedback({ type: "error", message: "Enter a valid PayPal email" });
    setFeedback(null);
    setShowConfirm(true);
  };

  const doWithdraw = async () => {
    setShowConfirm(false);
    setLoading(true);
    try {
      const res = await fetch("/.netlify/functions/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, paypalEmail })
      });
      const data = await res.json();
      if (!res.ok && data?.error) {
        setFeedback({ type: "error", message: data.error });
      } else if (data?.success || data?.status) {
        setFeedback({ type: "success", message: "Withdrawal requested successfully" });
        onSuccess && onSuccess(amount, data.paypalResponse || data);
        setAmount("");
        setPaypalEmail("");
      } else {
        setFeedback({ type: "success", message: "Withdrawal requested (response returned)" });
        onSuccess && onSuccess(amount, data.paypalResponse || data);
      }
    } catch (err) {
      setFeedback({ type: "error", message: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {feedback && (
        <div className={`p-2 rounded ${feedback.type === "error" ? "bg-red-50 border border-red-200 text-red-700" : "bg-green-50 border border-green-200 text-green-700"}`}>
          {feedback.message}
        </div>
      )}

      <label className="text-sm font-medium">Amount (ZAR)</label>
      <input
        type="number"
        min="1"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="p-2 border rounded"
        placeholder="Enter amount"
      />

      <label className="text-sm font-medium">PayPal Email</label>
      <input
        type="email"
        value={paypalEmail}
        onChange={e => setPaypalEmail(e.target.value)}
        className="p-2 border rounded"
        placeholder="user@example.com"
      />

      <div className="flex gap-2 items-center">
        <button
          onClick={openConfirm}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
        >
          {loading ? "Processing…" : "Withdraw"}
        </button>
        <button
          onClick={() => { setAmount(""); setPaypalEmail(""); setFeedback(null); }}
          className="px-3 py-2 rounded border"
        >
          Reset
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-semibold mb-2">Confirm Withdrawal</h3>
            <p className="mb-4">You are about to withdraw <strong>ZAR {amount}</strong> to <strong>{paypalEmail}</strong>. This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded border">Cancel</button>
              <button onClick={doWithdraw} className="px-4 py-2 rounded bg-red-600 text-white">Confirm & Pay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

