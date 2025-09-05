import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function AdminWithdrawRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await fetch("http://localhost:8000/withdraw_requests");
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load withdrawal requests.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const res = await fetch(`http://localhost:8000/withdraw_request/${id}/${action}`, {
        method: "POST"
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      fetchRequests(); // refresh list
    } catch (err) {
      console.error(err);
      setMessage("Action failed.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg">
        <Link to="/admin"> Back TO Dashboard</Link>
      <h2 className="text-xl font-bold mb-4">Admin - Withdrawal Requests</h2>
      {message && <p className="mb-3 text-red-500">{message}</p>}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Account</th>
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req._id}>
              <td className="border p-2">{req.name}</td>
              <td className="border p-2">{req.email}</td>
              <td className="border p-2">{req.amount}</td>
              <td className="border p-2">{req.account_number}</td>
              <td className="border p-2">{req.transaction_id}</td>
              <td className="border p-2 space-x-2">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => handleAction(req._id, "cancel")}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleAction(req._id, "release")}
                >
                  Release
                </button>
              </td>
            </tr>
          ))}
          {requests.length === 0 && (
            <tr>
              <td className="border p-2 text-center" colSpan={6}>
                No withdrawal requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

