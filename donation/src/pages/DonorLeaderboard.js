import { useEffect, useState } from "react";

const DonorLeaderboard = () => {
    const [sortedDonations, setsortedDonations] = useState([]);
    const [searchEmail, setSearchEmail] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const donationsRes = await fetch("http://localhost:8000/get_donations");
            const donationsData = await donationsRes.json();
            setsortedDonations(donationsData);
        } catch (error) {
            console.error("Error fetching donations:", error);
        }
    };

    const totalRaised = sortedDonations.reduce((sum, d) => sum + parseFloat(d.amount || 0), 0);

    const filteredDonations = sortedDonations.filter((d) =>
        d.email?.toLowerCase().includes(searchEmail.toLowerCase())
    );
    const averageDonation = sortedDonations.length > 0
        ? (totalRaised / sortedDonations.length).toFixed(2)
        : 0;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Donor Leaderboard</h2>
                        <p className="text-gray-600">Celebrating our generous donors</p>
                    </div>

                    {/* 🔍 Email Search */}
                    <div className="mb-6 max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search by donor email..."
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-purple-300"
                        />
                    </div>

                    {/* Summary Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-3xl font-bold text-purple-600">${totalRaised.toLocaleString()}</div>
                            <div className="text-gray-600">Total Donated</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-3xl font-bold text-purple-600">{sortedDonations.length}</div>
                            <div className="text-gray-600">Total Donors</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-3xl font-bold text-purple-600">${averageDonation.toLocaleString()}</div>
                            <div className="text-gray-600">Average Donation</div>
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                            <h3 className="text-2xl font-bold">Top Donors</h3>
                        </div>

                        {filteredDonations.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                No matching donors found.
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {filteredDonations.map((donation, index) => (
                                    <div key={donation._id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                                                index === 0 ? 'bg-yellow-500' :
                                                index === 1 ? 'bg-gray-400' :
                                                index === 2 ? 'bg-orange-500' :
                                                'bg-purple-500'
                                            }`}>
                                                {index < 3 ? ['🥇', '🥈', '🥉'][index] : index + 1}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-800">
                                                    {donation.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {donation.email}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    Donated to: {donation.eventTitle}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {new Date(donation.date).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-purple-600">
                                                ${donation.amount.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonorLeaderboard;
