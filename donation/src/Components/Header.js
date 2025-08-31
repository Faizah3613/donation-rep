import { Link, useNavigate } from 'react-router-dom';
import { BiDonateHeart } from "react-icons/bi";
import { useAuth } from '../Authprovider/AuthContext';
import "./Header.css"


const Header = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const handleLogout = () => {
        // Add actual logout logic if using Firebase/Aut`
        logout();
        // Assuming you have a logout function in your auth context
        navigate('/login');
    };


    
    return (
        <header className="gradient-bg text-white">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                            <span className="text-2xl"><BiDonateHeart style={{ color: "black" }} /></span>
                        </div>
                        <span className="text-xl font-bold">Hope Foundation</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Link to="/" className=" textcolor transition-colors">Home</Link>
                        <Link to="/donations" className=" textcolor transition-colors">Campaigns</Link>
                        <Link to="/leaderboard" className=" textcolor transition-colors">Leaderboard</Link>
                        <Link to="/admin" className=" textcolor transition-colors">Admin</Link>
                        <div className="flex items-center space-x-4 border-l border-blue-300 pl-6">
                            <div className="text-sm">
                                <div className="font-semibold">Welcome, </div> {/* {where will be  is logged user name} */}
                                <div className="text-white-200 text-xs">{user?.email}</div> {/* {where will be  is logged user email} */}
                            </div>

                           {user ? (
                                    <button 
                                        onClick={handleLogout}
                                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Log out
                                    </button>
                                    ) : (
                                    <Link 
                                        to="/login"
                                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium textcolor transition-colors"
                                    >
                                        Log in
                                    </Link>
                            )}

                            
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
