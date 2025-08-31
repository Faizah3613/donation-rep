import { useNavigate } from "react-router-dom"; // ✅ Fix the import

const DonationCard = ({ event }) => {
    const navigate = useNavigate();

const onDonate = () => {
    navigate(`/donate/${event._id}`, {
        state: { event }, // Pass full campaign object
    });
};

    const raised = event.raised || 0;
const target = event.target || 1; // avoid division by 0
const progressPercentage = Math.min((raised / target) * 100, 100);


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
                        <span>Raised: ${event.raised?.toLocaleString() || 0}</span>
                        <span>Goal: ${event.target?.toLocaleString() || 0}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercentage}%`, backgroundColor: "green" }}
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
                        {event.donors || 0} donors
                    </div>
                    <button 
                        onClick={onDonate}
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
