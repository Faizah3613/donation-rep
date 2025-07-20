import {useNavigate } from "react-router";
import DonationCard from "./DonationCard";


const Homepage = () => {
    const navigate = useNavigate();
    
    // Change from '0' to empty array (or real data if available)
    const events = [];

    const onSelectEvent = (eventId) => {
        navigate(`/donate/${eventId}`);
    };
  
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="gradient-bg text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Make a Difference Today
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100">
                        Join thousands of donors in creating positive change around the world
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                            className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            Start Donating
                        </button>
                        <button 
                            onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth' })}
                            className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-colors"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="p-6">
                            <div className="text-4xl font-bold text-purple-600 mb-2">
                                ${44}
                            </div>
                            <div className="text-gray-600 text-lg">Total Raised</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-purple-600 mb-2">
                                {44}
                            </div>
                            <div className="text-gray-600 text-lg">Happy Donors</div>
                        </div>
                        <div className="p-6">
                            <div className="text-4xl font-bold text-purple-600 mb-2">
                                {44}
                            </div>
                            <div className="text-gray-600 text-lg">Active Campaigns</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Campaigns */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Campaigns</h2>
                        <p className="text-gray-600 text-lg">Support causes that matter to you</p>
                    </div>
                    
                    {events.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📋</div>
                            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Active Campaigns</h3>
                            <p className="text-gray-500">Check back soon for new donation opportunities!</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {events.slice(0, 6).map(event => (
                                <DonationCard 
                                    key={event.id} 
                                    event={event} 
                                    onDonate={onSelectEvent}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
                        <p className="text-gray-600 text-lg">Simple steps to make a difference</p>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Choose a Cause</h3>
                            <p className="text-gray-600">Browse through our verified campaigns and find a cause that resonates with you.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💝</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Make a Donation</h3>
                            <p className="text-gray-600">Choose your donation amount and complete the secure donation process.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🌟</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">See the Impact</h3>
                            <p className="text-gray-600">Track your donation's progress and see the positive change you've helped create.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Donors Say</h2>
                        <p className="text-gray-600 text-lg">Real stories from real people making a difference</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                    S
                                </div>
                                <div className="ml-4">
                                    <div className="font-semibold">Sarah Johnson</div>
                                    <div className="text-sm text-gray-500">Regular Donor</div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"The platform makes it so easy to contribute to causes I care about. I love seeing the real-time progress updates!"</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                    M
                                </div>
                                <div className="ml-4">
                                    <div className="font-semibold">Michael Chen</div>
                                    <div className="text-sm text-gray-500">Monthly Supporter</div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"Knowing exactly where my money goes and seeing the impact gives me confidence in my donations."</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                    E
                                </div>
                                <div className="ml-4">
                                    <div className="font-semibold">Emily Rodriguez</div>
                                    <div className="text-sm text-gray-500">Community Leader</div>
                                </div>
                            </div>
                            <p className="text-gray-600 italic">"This platform has revolutionized how our community comes together to support important causes."</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 gradient-bg text-white">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join our community of changemakers and start your impact journey today
                    </p>
                    <button 
                        onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
                        className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Start Donating Now
                    </button>
                </div>
            </section>
        </div>
    );
};


export default Homepage;