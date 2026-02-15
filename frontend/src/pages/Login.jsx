import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Lock, Mail, Shield } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/login', { email, password });
            localStorage.setItem('token', response.data.access_token);
            showNotification('Login successful! Redirecting...', 'success');
            navigate('/dashboard');
        } catch (err) {
            const msg = err.response?.data?.detail || 'Invalid credentials';
            setError(msg);
            showNotification(msg, 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B3D91] via-[#051a42] to-[#0B3D91] flex items-center justify-center p-6">
            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="hidden md:block text-center"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Shield className="w-64 h-64 text-[#00BFA6] mx-auto drop-shadow-2xl" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mt-8">Welcome to SafeSphere</h2>
                    <p className="text-gray-300 mt-4">Secure your digital world with confidence</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-gray-300">Sign in to your account</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-[#00BFA6] text-white placeholder-gray-400"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <Link to="/forgot-password" className="text-sm text-[#00BFA6] hover:text-teal-300">
                                    Forgot?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="password"
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-[#00BFA6] text-white placeholder-gray-400"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#00BFA6] text-white font-semibold rounded-lg hover:bg-[#00a88f] transition-all hover:shadow-lg hover:shadow-teal-500/50"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-gray-400 mt-6">
                        Don't have an account? <Link to="/signup" className="text-[#00BFA6] hover:text-teal-300 font-medium">Sign up</Link>
                    </p>
                    <p className="text-center mt-4">
                        <Link to="/" className="text-gray-400 hover:text-white text-sm">← Back to Home</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
