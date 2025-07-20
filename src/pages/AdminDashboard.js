import { useState } from "react";

const AdminDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        target: '',
        image: '🎯'
    });

    const [events, setEvents] = useState([]);
    const [donations] = useState([]);
    const onAddEvent = (event) => {
        setEvents(prev => [...prev, event]);
    };

    const imageOptions = ['🎯', '🏥', '📚', '🌱', '🏠', '💧', '🍎', '👶', '🎓', '❤️'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!formData.title || !formData.description || !formData.target) {
            alert('Please fill in all fields.');
            return;
        }

        const newEvent = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            target: parseFloat(formData.target),
            raised: 0,
            donors: 0,
            image: formData.image,
            createdAt: new Date().toISOString()
        };

        onAddEvent(newEvent);
        setFormData({ title: '', description: '', target: '', image: '🎯' });
        setShowForm(false);
    };

    const totalRaised = donations.reduce((sum, donation) => sum + donation.amount, 0);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800">Admin Dashboard</h2>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                        >
                            + Create New Campaign
                        </button>
                    </div>

                    {/* Dashboard Stats */}
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-2xl font-bold text-purple-600">{events.length}</div>
                            <div className="text-gray-600">Active Campaigns</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-2xl font-bold text-green-600">${totalRaised.toLocaleString()}</div>
                            <div className="text-gray-600">Total Raised</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-2xl font-bold text-blue-600">{donations.length}</div>
                            <div className="text-gray-600">Total Donations</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="text-2xl font-bold text-orange-600">
                                ${donations.length > 0 ? Math.round(totalRaised / donations.length) : 0}
                            </div>
                            <div className="text-gray-600">Avg Donation</div>
                        </div>
                    </div>

                    {/* Campaign List */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                            <h3 className="text-2xl font-bold">Campaign Management</h3>
                        </div>
                        
                        {events.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                No campaigns created yet. Create your first campaign!
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {events.map(event => {
                                    const progress = Math.min((event.raised / event.target) * 100, 100);
                                    return (
                                        <div key={event.id} className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-4">
                                                    <span className="text-3xl">{event.image}</span>
                                                    <div>
                                                        <h4 className="text-xl font-semibold">{event.title}</h4>
                                                        <p className="text-gray-600">{event.description}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-semibold text-purple-600">
                                                        ${event.raised.toLocaleString()} / ${event.target.toLocaleString()}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {event.donors} donors
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div 
                                                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {progress.toFixed(1)}% Complete
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Create Campaign Modal */}
                    {showForm && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
                                <h3 className="text-2xl font-bold mb-6">Create New Campaign</h3>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Campaign Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter campaign title"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Description</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Describe your campaign"
                                            rows="3"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Target Amount ($)</label>
                                        <input
                                            type="number"
                                            name="target"
                                            value={formData.target}
                                            onChange={handleInputChange}
                                            placeholder="Enter target amount"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Campaign Icon</label>
                                        <div className="grid grid-cols-5 gap-2">
                                            {imageOptions.map(icon => (
                                                <button
                                                    key={icon}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, image: icon }))}
                                                    className={`p-3 text-2xl border-2 rounded-lg ${
                                                        formData.image === icon 
                                                            ? 'border-purple-500 bg-purple-50' 
                                                            : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                                >
                                                    {icon}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex space-x-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                                        >
                                            Create Campaign
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;