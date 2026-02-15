import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            // Adjust API URL as needed
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
        <div className="min-h-screen bg-[var(--color-brand-dark)] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-gray-400">Enter your email to receive a reset link.</p>
                </div>

                {status === 'success' ? (
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400">
                            <CheckCircle size={32} />
                        </div>
                        <p className="text-gray-300 mb-6">{message}</p>
                        <Link to="/login" className="text-[var(--color-brand-teal)] hover:underline">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {status === 'error' && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm">
                                <AlertCircle size={16} /> {message}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm text-gray-400 mb-1 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:border-[var(--color-brand-teal)] outline-none transition-colors"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-[var(--color-brand-blue)] hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
                            {!status === 'loading' && <ArrowRight size={18} />}
                        </button>

                        <div className="text-center mt-4">
                            <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                                Return to Login
                            </Link>
                        </div>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
