import { useEffect, useState } from "react";
import axios from "axios";

const EditDonationList = () => {
  const [donations, setDonations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedDonation, setEditedDonation] = useState({
    email: "",
    amount: "",
    name: "",
    date: "",
    account_number: "",
    transaction_id: "",
  });

  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/get_donations");
      setDonations(res.data || []);
    } catch (error) {
      console.error("Failed to fetch donations:", error);
      alert("Failed to fetch donations.");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?")) return;
    try {
      await axios.delete(`http://localhost:8000/delete_donation/${id}`);
      await fetchDonations();
    } catch (err) {
      console.error("Failed to delete donation:", err);
      alert("Failed to delete donation.");
    }
  };

  const handleEdit = (donation) => {
    setEditingId(donation._id);

    // only copy editable fields (exclude _id)
    setEditedDonation({
      email: donation.email || "",
      amount: donation.amount !== undefined && donation.amount !== null ? String(donation.amount) : "",
      name: donation.name || "",
      date: donation.date || "",
      account_number: donation.account_number || "",
      transaction_id: donation.transaction_id || "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedDonation({
      email: "",
      amount: "",
      name: "",
      date: "",
      account_number: "",
      transaction_id: "",
    });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...editedDonation,
        amount: editedDonation.amount === "" ? null : Number(editedDonation.amount),
      };

      if (payload.amount !== null && Number.isNaN(payload.amount)) {
        alert("Amount must be a valid number.");
        return;
      }

      // do NOT send _id in the body
      await axios.put(
        `http://localhost:8000/edit_donation/${editingId}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      setEditingId(null);
      setEditedDonation({
        email: "",
        amount: "",
        name: "",
        date: "",
        account_number: "",
        transaction_id: "",
      });

      await fetchDonations();
    } catch (error) {
      console.error("Failed to save donation:", error);
      alert("Something went wrong while saving.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedDonation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Donation List</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Donor Name</th>
              <th className="border px-4 py-2">Account Number</th>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => {
              const isEditing = editingId === donation._id;

              return (
                <tr key={donation._id}>
                  <td className="border px-4 py-2">
                    {isEditing ? (
                      <input
                        name="email"
                        value={editedDonation.email}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      donation.email
                    )}
                  </td>

                  <td className="border px-4 py-2">
                    {isEditing ? (
                      <input
                        name="amount"
                        type="number"
                        step="0.01"
                        value={editedDonation.amount}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      donation.amount
                    )}
                  </td>

                  <td className="border px-4 py-2">
                    {isEditing ? (
                      <input
                        name="name"
                        value={editedDonation.name}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      donation.name
                    )}
                  </td>

                  <td className="border px-4 py-2">
                    {isEditing ? (
                      <input
                        name="account_number"
                        value={editedDonation.account_number}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      donation.account_number || ""
                    )}
                  </td>

                  <td className="border px-4 py-2">
                    {isEditing ? (
                      <input
                        name="transaction_id"
                        value={editedDonation.transaction_id}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      donation.transaction_id || ""
                    )}
                  </td>

                  <td className="border px-4 py-2">
                    {isEditing ? (
                      <input
                        name="date"
                        value={editedDonation.date}
                        onChange={handleChange}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      donation.date
                    )}
                  </td>

                  <td className="border px-4 py-2 space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(donation)}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(donation._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}

            {donations.length === 0 && (
              <tr>
                <td className="border px-4 py-6 text-center text-gray-500" colSpan={7}>
                  No donations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditDonationList;
