import { useEffect, useState } from "react";
import axios from "axios";

const EditDonationList = () => {
      const [donations, setDonations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedDonation, setEditedDonation] = useState({});

  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:8000/get_donations");
      setDonations(res.data);
    } catch (error) {
      console.error("Failed to fetch donations:", error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donation?")) {
      await axios.delete(`http://localhost:8000/delete_donation/${id}`);
      fetchDonations();
    }
  };

  const handleEdit = (donation) => {
    setEditingId(donation._id);
    setEditedDonation(donation);
  };

  const handleSave = async () => {
    await axios.put(
      `http://localhost:8000/edit_donation/${editingId}`,
      editedDonation
    );
    setEditingId(null);
    fetchDonations();
  };

  const handleChange = (e) => {
    setEditedDonation({
      ...editedDonation,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Donation List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2"> Donor Name</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id}>
              <td className="border px-4 py-2">
                {editingId === donation._id ? (
                  <input
                    name="email"
                    value={editedDonation.email}
                    onChange={handleChange}
                  />
                ) : (
                  donation.email
                )}
              </td>
              <td className="border px-4 py-2">
                {editingId === donation._id ? (
                  <input
                    name="amount"
                    value={editedDonation.amount}
                    onChange={handleChange}
                  />
                ) : (
                  donation.amount
                )}
              </td>
             <td className="border px-4 py-2">
                {editingId === donation._id ? (
                    <input
                    name="name"
                    value={editedDonation.name}
                    onChange={handleChange}
                    />
                ) : (
                    donation.name
                )}
                </td>
              <td className="border px-4 py-2">
                {editingId === donation._id ? (
                  <input
                    name="date"
                    value={editedDonation.date}
                    onChange={handleChange}
                  />
                ) : (
                  donation.date
                )}
              </td>
              <td className="border px-4 py-2 space-x-2">
                {editingId === donation._id ? (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(donation)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(donation._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditDonationList;

