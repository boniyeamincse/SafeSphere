import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginIllustration from '../assets/login_illustration.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.access_token);
            navigate('/dashboard');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex w-1/2 bg-gray-800 items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 z-0"></div>
                <img
                    src={loginIllustration}
                    alt="Secure Login"
                    className="max-w-full h-auto rounded-2xl shadow-2xl z-10 border border-gray-700/50"
                />
                <div className="absolute bottom-10 left-10 z-10">
                    <h2 className="text-3xl font-bold text-blue-400 mb-2">SafeSphere</h2>
                    <p className="text-gray-400 max-w-md">Your gateway to advanced security awareness and protection.</p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-900">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-400">Please enter your details to sign in.</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">Email Address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-gray-500"
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
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-white placeholder-bullet"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex justify-end">
                            <Link to="/forgot-password" className="text-sm text-[var(--color-brand-teal)] hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 px-4 font-bold text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 focus:ring-4 focus:ring-blue-500/30 transition-all transform hover:scale-[1.01] shadow-lg shadow-blue-500/20"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-sm text-center text-gray-400">
                        Don't have an account? <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Sign up for free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
