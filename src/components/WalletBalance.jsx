export default function WalletBalance({ balance }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Wallet Balance</h3>
      <p className="text-green-600 font-bold">ZAR {balance}</p>
    </div>
  );
}
