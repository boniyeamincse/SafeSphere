import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginIllustration from '../assets/login_illustration.png';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/auth/register', {
                name,
                email,
                password,
            });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Email might be taken.');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex w-1/2 bg-gray-800 items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-purple-600/10 z-0"></div>
                <img
                    src={loginIllustration}
                    alt="Secure Signup"
                    className="max-w-full h-auto rounded-2xl shadow-2xl z-10 border border-gray-700/50 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-10 left-10 z-10">
                    <h2 className="text-3xl font-bold text-purple-400 mb-2">Join the Community</h2>
                    <p className="text-gray-400 max-w-md">Start your journey towards a safer digital environment today.</p>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-900">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-gray-400">Sign up to get started with SafeSphere.</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder-gray-500"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder-gray-500"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-white placeholder-bullet"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 font-bold text-white bg-purple-600 rounded-lg hover:from-purple-700 hover:to-purple-600 focus:ring-4 focus:ring-purple-500/30 transition-all transform hover:scale-[1.01] shadow-lg shadow-purple-500/20"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-400">
                        Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
