import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Shield, Plus, Search, Play, Pause, Trash2, Calendar, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import PageContainer from '../components/PageContainer';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const CampaignManagement = () => {
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const res = await axios.get('http://localhost:8000/campaigns/', config);
            setCampaigns(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching campaigns", error);
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            draft: 'bg-gray-500/20 text-gray-400',
            active: 'bg-green-500/20 text-green-400',
            completed: 'bg-blue-500/20 text-blue-400',
            paused: 'bg-yellow-500/20 text-yellow-400'
        };
        return `px-3 py-1 rounded-full text-xs font-bold uppercase ${styles[status] || 'bg-gray-500/20 text-gray-400'}`;
    };

    const getDifficultyBadge = (difficulty) => {
        const styles = {
            easy: 'bg-green-500/20 text-green-400',
            medium: 'bg-yellow-500/20 text-yellow-400',
            advanced: 'bg-red-500/20 text-red-400'
        };
        return `px-2 py-0.5 rounded text-xs font-bold uppercase ${styles[difficulty] || 'bg-gray-500/20 text-gray-400'}`;
    };

    const calculateRiskScore = (campaign) => {
        // Mock calculation - in real app, this would be based on click rates, submissions, etc.
        const baseScore = campaign.emails.reduce((sum, email) => sum + email.click_count, 0);
        return Math.min(100, Math.round(baseScore * 2.5));
    };

    const filteredCampaigns = campaigns.filter(c => {
        const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
        const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <PageContainer maxWidth="max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        <Shield className="text-brand-teal" size={32} /> Campaign Management
                    </h1>
                    <p className="text-gray-400 mt-1">Monitor and manage your phishing simulations.</p>
                </motion.div>
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/campaign-builder')}
                    className="flex items-center gap-2 px-6 py-3 bg-brand-teal hover:bg-teal-600 text-gray-900 font-bold rounded-xl transition-all shadow-lg shadow-teal-500/20 hover:-translate-y-1"
                >
                    <Plus size={18} /> New Campaign
                </motion.button>
            </div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search campaigns..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:border-brand-teal outline-none transition-colors"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-brand-teal outline-none transition-colors"
                    >
                        <option value="all">All Statuses</option>
                        <option value="draft">Draft</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="paused">Paused</option>
                    </select>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <TrendingUp size={16} className="text-brand-teal" />
                        <span>{filteredCampaigns.length} campaigns found</span>
                    </div>
                </div>
            </motion.div>

            {/* Campaigns Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            >
                {loading ? (
                    <div className="p-12 text-center text-gray-400">Loading campaigns...</div>
                ) : filteredCampaigns.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <Shield size={48} className="mx-auto mb-4 opacity-20" />
                        <p>No campaigns found. Create your first campaign to get started!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                                    <th className="p-4">Campaign</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Difficulty</th>
                                    <th className="p-4">Sent</th>
                                    <th className="p-4">Clicked</th>
                                    <th className="p-4">Risk Score</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-300">
                                {filteredCampaigns.map((campaign) => {
                                    const totalSent = campaign.emails.length;
                                    const totalClicks = campaign.emails.reduce((sum, e) => sum + e.click_count, 0);
                                    const riskScore = calculateRiskScore(campaign);

                                    return (
                                        <tr key={campaign.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4">
                                                <div>
                                                    <div className="font-medium text-white">{campaign.title}</div>
                                                    <div className="text-xs text-gray-500 mt-0.5">{campaign.description || 'No description'}</div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={getStatusBadge(campaign.status)}>{campaign.status}</span>
                                            </td>
                                            <td className="p-4">
                                                <span className={getDifficultyBadge(campaign.difficulty)}>{campaign.difficulty}</span>
                                            </td>
                                            <td className="p-4 font-mono">{totalSent}</td>
                                            <td className="p-4 font-mono">{totalClicks}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-green-500 to-red-500 h-full transition-all"
                                                            style={{ width: `${riskScore}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-bold w-8">{riskScore}%</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    {campaign.status === 'active' && (
                                                        <button className="p-2 hover:bg-white/10 rounded-lg text-yellow-400">
                                                            <Pause size={16} />
                                                        </button>
                                                    )}
                                                    {campaign.status === 'paused' && (
                                                        <button className="p-2 hover:bg-white/10 rounded-lg text-green-400">
                                                            <Play size={16} />
                                                        </button>
                                                    )}
                                                    <button className="p-2 hover:bg-white/10 rounded-lg text-red-400">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </PageContainer>
    );
};

export default CampaignManagement;
