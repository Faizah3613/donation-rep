import { useState } from "react";
import { useLocation } from "react-router-dom";

const Donation = () => {
    const [donationAmount, setDonationAmount] = useState(0);
    const [customAmount, setCustomAmount] = useState('');
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    
    const location = useLocation();
    const selectedEvent = location?.state?.event;
    

    if (!selectedEvent) {
        return <div>Event data not found. Please go back and try again.</div>;
    }
    if (!selectedEvent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">No campaign selected. Please go back and choose one.</p>
            </div>
        );
    }
    const onBack = () => {
        window.history.back();
    };

    const onDonationComplete = (donation) => {
        // Here you would typically send the donation to your backend or handle it accordingly
        console.log("Donation completed:", donation);
        //here start code to insert donation into database
        fetch("http://localhost:8000/add_donation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(donation),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Donation saved:", data);
        })
        .catch(error => {
            console.error("Error saving donation:", error);
        });

        alert(`Thank you for your donation of $${donation.amount} to ${selectedEvent.title}!`);
        onBack(); // Navigate back after donation
    };

    const presetAmounts = [25, 50, 100, 250, 500];

    const handleAmountSelect = (amount) => {
        setDonationAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (e) => {
        const value = e.target.value;
        setCustomAmount(value);
        if (value && value > 0) {
            setDonationAmount(parseFloat(value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (donationAmount <= 0) {
            alert('Please select a donation amount.');
            return;
        }

        if (!donorName || !donorEmail) {
            alert('Please fill in your name and email.');
            return;
        }

        const donation = {
            name: isAnonymous ? 'Anonymous' : donorName.trim(),
            amount: donationAmount,
            email: donorEmail.trim(),
            date: new Date().toISOString(),
            campaignId: selectedEvent._id,
            campaignTitle: selectedEvent.title,
        };
        


        onDonationComplete(donation);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={onBack}
                        className="mb-6 flex items-center text-purple-600 hover:text-purple-700"
                    >
                        ← Back to Donations
                    </button>

                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                            <h2 className="text-black font-bold mb-2">Donate to {selectedEvent.title}</h2>
                            <p className="text-black">{selectedEvent.description}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Amount Selection */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Choose Amount</h3>
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {presetAmounts.map(amount => (
                                            <button
                                                key={amount}
                                                type="button"
                                                onClick={() => handleAmountSelect(amount)}
                                                className={`p-3 border-2 rounded-lg font-semibold transition-colors ${
                                                    donationAmount === amount && !customAmount
                                                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                                                        : 'border-gray-200 hover:border-purple-300'
                                                }`}
                                            >
                                                ${amount}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Custom Amount</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-gray-500">$</span>
                                            <input
                                                type="number"
                                                value={customAmount}
                                                onChange={handleCustomAmountChange}
                                                placeholder="Enter amount"
                                                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                                        <div className="text-2xl font-bold text-purple-600">
                                            Total: ${donationAmount}
                                        </div>
                                    </div>
                                </div>

                                {/* Donor Information */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Your Information</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Full Name</label>
                                            <input
                                                type="text"
                                                value={donorName}
                                                onChange={(e) => setDonorName(e.target.value)}
                                                placeholder="Enter your full name"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                value={donorEmail}
                                                onChange={(e) => setDonorEmail(e.target.value)}
                                                placeholder="Enter your email"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                                required
                                            />
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="anonymous"
                                                checked={isAnonymous}
                                                onChange={(e) => setIsAnonymous(e.target.checked)}
                                                className="rounded"
                                            />
                                            <label htmlFor="anonymous" className="text-sm text-gray-600">
                                                Make this donation anonymous
                                            </label>
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg"
                                        >
                                            Complete Donation
                                        </button>

                                        <p className="text-xs text-gray-500 text-center">
                                            🔒 This is a demo - no actual payment will be processed.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Donation;