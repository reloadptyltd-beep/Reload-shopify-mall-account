import { useState } from "react";

export default function Dashboard() {
  const [balance, setBalance] = useState(0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Your current balance:</p>
      <h2>R {balance}</h2>

      <p>
        This is a placeholder dashboard page.  
        Once everything builds correctly, we will continue adding:
      </p>

      <ul>
        <li>Real withdrawals (PayPal, Bank, USDT TRC20)</li>
        <li>Task completion system</li>
        <li>User earnings</li>
        <li>Profile</li>
        <li>Deposit methods</li>
      </ul>
    </div>
  );
}
