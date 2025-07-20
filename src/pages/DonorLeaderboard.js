const DonorLeaderboard = () => {
    const sortedDonations = [
        { id: 1, donorName: "Alice", amount: 500, eventTitle: "Charity Gala", date: "2023-10-01" },
        { id: 2, donorName: "Bob", amount: 300, eventTitle: "Food Drive", date: "2023-10-02" },
        { id: 3, donorName: "Charlie", amount: 200, eventTitle: "Book Fair", date: "2023-10-03" },
        { id: 4, donorName: "David", amount: 150, eventTitle: "Clothing Donation", date: "2023-10-04" },
        { id: 5, donorName: "Eve", amount: 100, eventTitle: "Animal Shelter", date: "2023-10-05" },
    ];
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Donor Leaderboard</h2>
                        <p className="text-gray-600">Celebrating our generous donors</p>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-3xl font-bold text-purple-600">$</div>
                            <div className="text-gray-600">Total Donated</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-3xl font-bold text-purple-600"></div>
                            <div className="text-gray-600">Total Donors</div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md text-center">
                            <div className="text-3xl font-bold text-purple-600">
                                {44}
                            </div>
                            <div className="text-gray-600">Average Donation</div>
                        </div>
                    </div>

                    {/* Leaderboard */}
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                            <h3 className="text-2xl font-bold">Top Donors</h3>
                        </div>
                        
                        {sortedDonations.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">
                                No donations yet. Be the first to donate!
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-200">
                                {sortedDonations.map((donation, index) => (
                                    <div key={donation.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
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
                                                    {donation.donorName}
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