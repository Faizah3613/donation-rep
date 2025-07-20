import { Navigate } from "react-router";
import DonationCard from "./DonationCard";

const DonationList = () => {
    const events = [
        { id: 1, title: "Charity Gala", description: "Help us raise funds for local charities.", date: "2023-11-01", image: "https://via.placeholder.com/300x200" },
        { id: 2, title: "Food Drive", description: "Donate food items to help those in need.", date: "2023-11-15", image: "https://via.placeholder.com/300x200" },
        { id: 3, title: "Book Fair", description: "Support literacy by donating books.", date: "2023-12-01", image: "https://via.placeholder.com/300x200" },
        { id: 4, title: "Clothing Donation", description: "Donate gently used clothing to help the homeless.", date: "2023-12-15", image: "https://via.placeholder.com/300x200" },
        { id: 5, title: "Animal Shelter", description: "Support our furry friends by donating supplies.", date: "2024-01-01", image: "https://via.placeholder.com/300x200" },
    ];
    const onSelectEvent = (eventId) => {
        Navigate(`/donate/${eventId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Active Donation Campaigns</h2>
                        <p className="text-gray-600">Choose a cause you care about and make a difference</p>
                    </div>

                    {events.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Active Campaigns</h3>
                            <p className="text-gray-500">Check back soon for new donation opportunities!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.map(event => (
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