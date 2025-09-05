import React from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';

import Headers from './Components/Header';
import DonationList from './pages/DonationList';
import Donation from './pages/Donation';
import DonorLeaderboard from './pages/DonorLeaderboard';
import AdminDashboard from './pages/AdminDashboard';
import Homepage from './pages/Homepage'
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './Route/PrivateRoute';
import AdminWithdrawRequests from './pages/AdminWithdrawRequests';

const App = () => {
    return (

            <div className="min-h-screen bg-gray-50">
                <Headers />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/donations" element={<DonationList />} />
                    <Route path="/donate/:id" element={<Donation />} />
                    <Route path="/leaderboard" element={<DonorLeaderboard />} />
                    <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
                    <Route path="/withdraw_req" element={<PrivateRoute><AdminWithdrawRequests /></PrivateRoute>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>

    );
};

export default App;
