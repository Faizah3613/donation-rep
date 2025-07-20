import { useNavigate } from "react-router";



const DonationCard = () => {

    const Navigate = useNavigate();
    const event = {
        id: 1,
        title: "Charity Gala",
        description: "Help us raise funds for local charities.",
        date: "2023-11-01",
        image: "https://via.placeholder.com/300x200",
        raised: 5000,
        target: 10000,
        donors: 150,
    };  

    const onDonate = () => {
        Navigate(`/donate/${event.id}`, { state: { event } });
    };


    const progressPercentage = Math.min((event.raised / event.target) * 100, 100);
    
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                <span className="text-6xl">{event.image}</span>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Raised: ${event.raised.toLocaleString()}</span>
                        <span>Goal: ${event.target.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <div className="text-center mt-2">
                        <span className="text-lg font-semibold text-purple-600">
                            {progressPercentage.toFixed(1)}% Complete
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                        {event.donors} donors
                    </div>
                    <button 
                        onClick={() => onDonate(event)}
                        className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                        Donate Now
                    </button>
                </div>
            </div>
        </div>
    );
};


export default DonationCard;