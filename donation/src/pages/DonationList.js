import { useEffect, useState } from "react";
import DonationCard from "./DonationCard";

const DonationList = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const campaignsRes = await fetch("http://localhost:8000/get_campaigns");
            const campaignsData = await campaignsRes.json();
            setEvents(campaignsData);
        } catch (error) {
            console.error("Error fetching campaigns:", error);
        }
    };

    const onSelectEvent = (event) => {
        // Handle event selection (e.g., navigate to donate page)
        console.log("Selected event:", event);
    };

    // Filter events based on the campaign title
    const filteredEvents = events.filter((event) =>
        event.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-gray-800 ">Active Donation Campaigns</h2>
                        <p className="text-gray-600">Choose a cause you care about and make a difference</p>
                    </div>

                    {/* 🔍 Filter input */}
                    <div className="mb-8 max-w-md mx-auto">
                        <input 
                           
                            type="text"
                            placeholder="Search by campaign name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{border:'2px solid #0080006b !important',boxShadow: '0 0 6px 3px #0080006b !important'}}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {filteredEvents.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Campaigns Found</h3>
                            <p className="text-gray-500">Try searching with a different keyword.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredEvents.map((event) => (
                                <DonationCard
                                    key={event.id}
                                    event={event}
                                    onDonate={onSelectEvent}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonationList;
