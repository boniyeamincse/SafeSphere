import React, { useState } from 'react';
import { Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token'); // Simplistic token retrieval from URL ?token=... for prototype

    // In a real scenario, you'd likely extract the token from the URL path /reset-password/:token

    const [formData, setFormData] = useState({ email: '', new_password: '', confirm_password: '' });
    const [status, setStatus] = useState('idle');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.new_password !== formData.confirm_password) {
            setMessage("Passwords do not match");
            setStatus('error');
            return;
        }

        setStatus('loading');
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            // We need to pass the token. Ideally, this token is in the URL.
            // For this UI prototype, we might ask user to paste it or assume it's pre-filled/hidden.
            // Let's assume we capture 'email' and 'new_password' and 'token'. 
            // The backend expects email, new_password, token.

            await axios.post(`${API_URL}/auth/reset-password`, {
                email: formData.email,
                new_password: formData.new_password,
                token: token || "dummy_token" // Fallback if regular testing without email link
            });

            setStatus('success');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            setStatus('error');
            setMessage('Failed to reset password. Token might be invalid or expired.');
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Set New Password</h1>
                    <p className="text-gray-400">Secure your account with a strong password.</p>
                </div>

                {status === 'success' ? (
                    <div className="text-center">
                        <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-400">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Password Reset!</h3>
                        <p className="text-gray-300 mb-6">Redirecting to login in 3 seconds...</p>
                        <Link to="/login" className="bg-[var(--color-brand-teal)] text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-teal-500">
                            Login Now
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
                            <label className="block text-sm text-gray-400 mb-1 ml-1">Confirm Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:border-[var(--color-brand-teal)] outline-none"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1 ml-1">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:border-[var(--color-brand-teal)] outline-none"
                                    value={formData.new_password}
                                    onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1 ml-1">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-gray-900 border border-gray-700 text-white pl-10 pr-4 py-3 rounded-xl focus:border-[var(--color-brand-teal)] outline-none"
                                    value={formData.confirm_password}
                                    onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-[var(--color-brand-teal)] hover:bg-teal-600 text-gray-900 font-bold py-3 rounded-xl transition-all shadow-lg shadow-teal-500/20"
                        >
                            {status === 'loading' ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </form>
                )}
            </motion.div>
        </div>
    );
};

export default ResetPassword;
