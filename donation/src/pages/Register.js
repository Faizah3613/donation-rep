import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authprovider/AuthContext";


const Register = ( ) => {
    const { registerUser } = useAuth; // 👈 Use context
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };


    const onSwitchToLogin = () => {
        navigate('/login'); // 👈 Redirect to login page
    };
    // Function to validate form inputs
    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.agreeToTerms) {
            newErrors.agreeToTerms = 'You must agree to the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await registerUser(formData.email, formData.password);
            setIsLoading(false);
            navigate("/admin"); // 👈 Redirect after successful registration
        } catch (error) {
            setErrors({ firebase: error.message });
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen auth-bg flex items-center justify-center p-4 floating-shapes relative overflow-hidden">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">❤️</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Hope Foundation</h2>
                    <p className="text-gray-600">Create your account to start making a difference</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="John"
                                className={`w-full px-3 py-2 border rounded-lg ${
                                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Doe"
                                className={`w-full px-3 py-2 border rounded-lg ${
                                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className={`w-full px-3 py-2 border rounded-lg ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a strong password"
                            className={`w-full px-3 py-2 border rounded-lg ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            className={`w-full px-3 py-2 border rounded-lg ${
                                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                    </div>

                    <div>
                        <label className="flex items-start space-x-2">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleInputChange}
                                className="mt-1 rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-600">
                                I agree to the{' '}
                                <button type="button" className="text-purple-600 hover:text-purple-700">
                                    Terms of Service
                                </button>{' '}
                                and{' '}
                                <button type="button" className="text-purple-600 hover:text-purple-700">
                                    Privacy Policy
                                </button>
                            </span>
                        </label>
                        {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
                    </div>

                    {errors.firebase && (
                        <div className="text-red-500 text-sm mt-2 text-center">{errors.firebase}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                Creating Account...
                            </div>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <button 
                            onClick={onSwitchToLogin}
                            className="text-purple-600 hover:text-purple-700 font-semibold"
                        >
                            Sign in here
                        </button>
                    </p>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                        🔒 Demo Mode - Registration creates a Firebase user
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
