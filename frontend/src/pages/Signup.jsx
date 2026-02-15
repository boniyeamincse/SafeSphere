import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Lock, Mail, User, Shield } from 'lucide-react';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/auth/register', { name, email, password });
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Email might be taken.');
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
                    <h2 className="text-3xl font-bold text-white mt-8">Join SafeSphere</h2>
                    <p className="text-gray-300 mt-4">Start your security awareness journey today</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-gray-300">Sign up to get started</p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-5">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-300">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-[#00BFA6] text-white placeholder-gray-400"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

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
                            <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
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
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center text-gray-400 mt-6">
                        Already have an account? <Link to="/login" className="text-[#00BFA6] hover:text-teal-300 font-medium">Login</Link>
                    </p>
                    <p className="text-center mt-4">
                        <Link to="/" className="text-gray-400 hover:text-white text-sm">← Back to Home</Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
