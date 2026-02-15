import React, { useState } from 'react';
import { Calendar, Mail, Plus, Trash2, Save, Send } from 'lucide-react';

const CampaignBuilder = () => {
    const [emails, setEmails] = useState([{ id: 1, subject: '', body: '' }]);

    const addEmail = () => {
        setEmails([...emails, { id: Date.now(), subject: '', body: '' }]);
    };

    const removeEmail = (id) => {
        setEmails(emails.filter(email => email.id !== id));
    };

    return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">New Phishing Campaign</h1>
                        <p className="text-gray-400 mt-1">Design and schedule your simulation.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                            <Save size={18} /> Save Draft
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 bg-[var(--color-brand-teal)] hover:bg-teal-600 text-gray-900 font-bold rounded-lg transition-colors shadow-lg shadow-teal-500/20">
                            <Send size={18} /> Launch Campaign
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Campaign Details */}
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-400">
                            <Calendar size={20} /> Campaign Settings
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Campaign Title</label>
                                <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-[var(--color-brand-blue)] outline-none" placeholder="e.g. Q4 Phishing Drill" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Start Date</label>
                                    <input type="date" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-[var(--color-brand-blue)] outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">End Date</label>
                                    <input type="date" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-[var(--color-brand-blue)] outline-none" />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm text-gray-400 mb-1">Description</label>
                                <textarea className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-[var(--color-brand-blue)] outline-none h-24" placeholder="Internal notes about the campaign..."></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Email Templates */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-[var(--color-brand-teal)]">
                                <Mail size={20} /> Phishing Templates
                            </h3>
                            <button onClick={addEmail} className="text-sm flex items-center gap-1 text-[var(--color-brand-blue)] hover:text-blue-400 font-medium">
                                <Plus size={16} /> Add Template
                            </button>
                        </div>

                        {emails.map((email, index) => (
                            <div key={email.id} className="bg-gray-800 p-6 rounded-xl border border-gray-700 relative group transition-all hover:border-gray-600">
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => removeEmail(email.id)} className="text-red-400 hover:text-red-300 bg-red-500/10 p-2 rounded-lg">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm text-gray-400 mb-1">Email Subject</label>
                                    <input type="text" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-[var(--color-brand-blue)] outline-none" placeholder="e.g. Urgent: Password Expiry Notification" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Email Body (HTML supported)</label>
                                    <textarea className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:border-[var(--color-brand-blue)] outline-none h-40 font-mono text-sm" placeholder="<html>...</html>"></textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampaignBuilder;
