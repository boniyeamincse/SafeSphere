import React, { useState } from 'react';
import { Calendar, Mail, Plus, Trash2, Save, Send, Target, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import PageContainer from '../components/PageContainer';

const CampaignBuilder = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [emails, setEmails] = useState([{ id: 1, subject: '', body: '' }]);

    const addEmail = () => {
        setEmails([...emails, { id: Date.now(), subject: '', body: '' }]);
    };

    const removeEmail = (id) => {
        setEmails(emails.filter(email => email.id !== id));
    };

    const updateEmail = (id, field, value) => {
        setEmails(emails.map(email => (email.id === id ? { ...email, [field]: value } : email)));
    };

    const handleLaunch = async () => {
        if (!title) {
            showNotification('Please enter a campaign title', 'warning');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // 1. Create Campaign
            const campaignData = {
                title,
                description,
                start_date: startDate ? new Date(startDate).toISOString() : null,
                end_date: endDate ? new Date(endDate).toISOString() : null,
                status: 'active'
            };

            const campaignRes = await axios.post('http://localhost:8000/campaigns/', campaignData, config);
            const campaignId = campaignRes.data.id;

            // 2. Add Emails
            for (const email of emails) {
                if (email.subject && email.body) {
                    await axios.post(`http://localhost:8000/campaigns/${campaignId}/emails`, {
                        subject: email.subject,
                        body: email.body
                    }, config);
                }
            }

            showNotification('Campaign launched successfully!', 'success');
            navigate('/dashboard');

        } catch (error) {
            console.error(error);
            showNotification('Failed to launch campaign', 'error');
        }
    };

    return (
        <PageContainer maxWidth="max-w-5xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        <Target className="text-brand-teal" size={32} /> New Phishing Campaign
                    </h1>
                    <p className="text-gray-400 mt-1 ml-10">Design and schedule your simulation in minutes.</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                >
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-gray-300">
                        <Save size={18} /> Save Draft
                    </button>
                    <button
                        onClick={handleLaunch}
                        className="flex items-center gap-2 px-6 py-2 bg-brand-teal hover:bg-teal-600 text-gray-900 font-bold rounded-xl transition-all shadow-lg shadow-teal-500/20 hover:-translate-y-1"
                    >
                        <Send size={18} /> Launch Campaign
                    </button>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Campaign Details */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1 space-y-6"
                >
                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-brand-teal">
                            <Calendar size={20} /> Campaign Settings
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Campaign Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                    placeholder="e.g. Q4 Phishing Drill"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">End Date</label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors h-32 resize-none"
                                    placeholder="Internal notes..."
                                ></textarea>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Email Templates */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold flex items-center gap-2 text-white">
                            <Mail className="text-brand-teal" size={24} /> Phishing Templates
                        </h3>
                        <button
                            onClick={addEmail}
                            className="flex items-center gap-2 text-sm text-brand-teal hover:text-white px-3 py-1.5 rounded-lg border border-brand-teal/30 hover:bg-brand-teal/10 transition-colors"
                        >
                            <Plus size={16} /> Add Template
                        </button>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence>
                            {emails.map((email, index) => (
                                <motion.div
                                    key={email.id}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 relative group transition-all hover:border-brand-teal/30 hover:bg-white/10"
                                >
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => removeEmail(email.id)} className="text-red-400 hover:text-red-300 bg-red-500/10 p-2 rounded-lg hover:bg-red-500/20 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-brand-teal/10 text-brand-teal text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider">Email {index + 1}</span>
                                        </div>
                                        <label className="block text-sm text-gray-400 mb-1">Subject Line</label>
                                        <input
                                            type="text"
                                            value={email.subject}
                                            onChange={(e) => updateEmail(email.id, 'subject', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors font-medium"
                                            placeholder="e.g. Action Required: Verify your account"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Email Body (HTML)</label>
                                        <textarea
                                            value={email.body}
                                            onChange={(e) => updateEmail(email.id, 'body', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors h-40 font-mono text-sm leading-relaxed"
                                            placeholder="<html>...</html>"
                                        ></textarea>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </PageContainer>
    );
};

export default CampaignBuilder;
