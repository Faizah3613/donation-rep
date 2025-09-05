// === AdminDashboard.jsx ===
import { useEffect, useState } from "react";
import EditDonationList from "./EditDonationList";
import { Link } from "react-router";

const AdminDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        _id: null,
        title: '',
        description: '',
        target: '',
        image: '🎯'
    });
    const [events, setEvents] = useState([]);
    const [donations, setDonations] = useState([]);
    const imageOptions = ['🎯', '🏥', '📚', '🌱', '🏠', '💧', '🍎', '👶', '🎓', '❤️'];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const campaignsRes = await fetch("http://localhost:8000/get_campaigns");
        const campaignsData = await campaignsRes.json();
        setEvents(campaignsData);

        const donationsRes = await fetch("http://localhost:8000/get_donations");
        const donationsData = await donationsRes.json();
        setDonations(donationsData);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.description || !formData.target) {
            alert("Please fill in all fields.");
            return;
        }

        const campaignData = {
            title: formData.title,
            description: formData.description,
            target: parseFloat(formData.target),
            image: formData.image
        };

        if (formData._id) {
            await fetch(`http://localhost:8000/edit_campaign/${formData._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campaignData)
            });
        } else {
            await fetch("http://localhost:8000/create_campaign", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(campaignData)
            });
        }

        fetchData();
        setFormData({ _id: null, title: '', description: '', target: '', image: '🎯' });
        setShowForm(false);
    };

    const handleEditCampaign = (event) => {
        setFormData(event);
        setShowForm(true);
    };

    const handleDeleteCampaign = async (id) => {
        if (window.confirm("Are you sure to delete this campaign?")) {
            await fetch(`http://localhost:8000/delete_campaign/${id}`, { method: 'DELETE' });
            fetchData();
        }
    };

    const totalRaised = donations.reduce((sum, d) => sum + parseFloat(d.amount || 0), 0);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Link to="/withdraw_req"> withdraw request</Link>
                <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={() => setShowForm(true)}>+ Create Campaign</button>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-4 rounded shadow">
                    <div className="text-xl font-bold">{events.length}</div>
                    <div>Active Campaigns</div>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <div className="text-xl font-bold">${totalRaised.toLocaleString()}</div>
                    <div>Total Raised</div>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <div className="text-xl font-bold">{donations.length}</div>
                    <div>Total Donations</div>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <div className="text-xl font-bold">${donations.length ? Math.round(totalRaised / donations.length) : 0}</div>
                    <div>Avg Donation</div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg">
                <div className="p-4 border-b font-semibold">Campaigns</div>
                {events.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No campaigns available</div>
                ) : (
                    <div>
                        {events.map(event => {
                            const progress = Math.min((event.raised / event.target) * 100, 100);
                            return (
                                <div key={event._id} className="p-4 border-b">
                                    <div className="flex justify-between">
                                        <div className="flex gap-3">
                                            <span className="text-2xl">{event.image}</span>
                                            <div>
                                                <div className="font-bold">{event.title}</div>
                                                <div className="text-sm text-gray-500">{event.description}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-purple-600 font-bold">${event.raised} / ${event.target}</div>
                                            <div className="text-sm text-gray-500">{event.donors} donors</div>
                                            <div className="flex gap-2 mt-2">
                                                <button onClick={() => handleEditCampaign(event)} className="text-blue-600 hover:underline">Edit</button>
                                                <button onClick={() => handleDeleteCampaign(event._id)} className="text-red-600 hover:underline">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded h-2 mt-2">
                                        <div className="h-2 bg-green-500 rounded" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <div className="text-sm text-gray-600">{progress.toFixed(1)}% complete</div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-xl font-bold mb-4">{formData._id ? 'Edit' : 'Create'} Campaign</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" className="w-full border p-2 rounded" />
                            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" className="w-full border p-2 rounded" />
                            <input name="target" type="number" value={formData.target} onChange={handleInputChange} placeholder="Target Amount" className="w-full border p-2 rounded" />
                            <div className="grid grid-cols-5 gap-1">
                                {imageOptions.map(icon => (
                                    <button type="button" key={icon} onClick={() => setFormData(prev => ({ ...prev, image: icon }))} className={`text-xl p-2 border rounded ${formData.image === icon ? 'bg-purple-100' : ''}`}>{icon}</button>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-gray-300 py-2 rounded">Cancel</button>
                                <button type="submit" className="flex-1 bg-purple-600 text-white py-2 rounded">{formData._id ? 'Update' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            <EditDonationList />
        </div>
    );
};

export default AdminDashboard;
