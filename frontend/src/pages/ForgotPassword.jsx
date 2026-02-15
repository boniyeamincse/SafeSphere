import React, { useState } from 'react';
import { Mail, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            await axios.post(`${API_URL}/auth/request-password-reset`, { email });
            setStatus('success');
            setMessage('If an account exists with this email, you will receive a password reset link shortly.');
        } catch (error) {
            setStatus('error');
            setMessage('An error occurred. Please try again later.');
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
                    <h2 className="text-3xl font-bold text-white mt-8">Reset Your Password</h2>
                    <p className="text-gray-300 mt-4">We'll help you get back to your account</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl"
                >
                    {status === 'success' ? (
                        <div className="text-center">
                            <CheckCircle className="w-16 h-16 text-[#00BFA6] mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-4">Check Your Email</h2>
                            <p className="text-gray-300 mb-6">{message}</p>
                            <Link to="/login" className="inline-block px-6 py-3 bg-[#00BFA6] text-white rounded-lg hover:bg-[#00a88f] transition-all">
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
                                <p className="text-gray-300">Enter your email to receive a reset link</p>
                            </div>

                            {status === 'error' && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-6 text-sm">
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
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

                                <button
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="w-full py-3 bg-[#00BFA6] text-white font-semibold rounded-lg hover:bg-[#00a88f] transition-all hover:shadow-lg hover:shadow-teal-500/50 disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
                                </button>
                            </form>

                            <p className="text-center text-gray-400 mt-6">
                                Remember your password? <Link to="/login" className="text-[#00BFA6] hover:text-teal-300 font-medium">Login</Link>
                            </p>
                            <p className="text-center mt-4">
                                <Link to="/" className="text-gray-400 hover:text-white text-sm">← Back to Home</Link>
                            </p>
                        </>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ForgotPassword;
