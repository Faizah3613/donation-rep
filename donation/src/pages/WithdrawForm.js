import { useState } from "react";

export default function WithdrawForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    account_number: "",
    amount: "",
    transaction_id: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await fetch("http://localhost:8000/withdraw_request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        });

        const data = await res.json();
        setMessage(data.message || data.error);
    } catch (err) {
        console.error("Request failed:", err);
        setMessage("Failed to submit withdrawal request.");
    }
    };


  return (
    <div className="max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">Withdrawal Request</h2>
      <p className="text-sm text-gray-600 mb-4">
        Please read carefully before submitting:
        <ul className="list-disc pl-5">
          <li>Amount must match your donation record.</li>
          <li>Email & Transaction ID must be the same as your donation.</li>
          <li>Admin approval is required before funds are released.</li>
        </ul>
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="border p-2 w-full" name="name" placeholder="Name" onChange={handleChange} />
        <input className="border p-2 w-full" name="email" placeholder="Email" onChange={handleChange} />
        <input className="border p-2 w-full" name="account_number" placeholder="Account Number" onChange={handleChange} />
        <input className="border p-2 w-full" name="amount" placeholder="Amount" onChange={handleChange} />
        <input className="border p-2 w-full" name="transaction_id" placeholder="Transaction ID" onChange={handleChange} />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
      {message && <p className="mt-3 text-red-500">{message}</p>}
    </div>
  );
}
