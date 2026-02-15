import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, ChevronLeft, Shield, Users, Mail, Calendar, Eye } from 'lucide-react';
import axios from 'axios';
import { useNotification } from '../context/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageContainer from '../components/PageContainer';

const CampaignBuilder = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const [currentStep, setCurrentStep] = useState(0);
    const [groups, setGroups] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [landingPages, setLandingPages] = useState([]);
    const [smtpProfiles, setSmtpProfiles] = useState([]);

    // Form State
    const [formData, setFormData] = useState({
        // Step 1: Details
        title: '',
        description: '',
        difficulty: 'easy',
        track_opens: true,
        track_clicks: true,
        track_submissions: false,

        // Step 2: Targets
        target_group_ids: [],

        // Step 3: Content
        email_template_id: null,
        landing_page_id: null,

        // Step 4: Schedule
        start_date: '',
        end_date: '',
        smtp_profile_id: null,
        status: 'draft'
    });

    const steps = [
        { name: 'Details', icon: Shield },
        { name: 'Targets', icon: Users },
        { name: 'Content', icon: Mail },
        { name: 'Schedule', icon: Calendar },
        { name: 'Review', icon: Eye }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [groupsRes, templatesRes, pagesRes, smtpRes] = await Promise.all([
                axios.get('http://localhost:8000/groups/', config),
                axios.get('http://localhost:8000/assets/email-templates/', config),
                axios.get('http://localhost:8000/assets/landing-pages/', config),
                axios.get('http://localhost:8000/assets/smtp-profiles/', config)
            ]);

            setGroups(groupsRes.data);
            setTemplates(templatesRes.data);
            setLandingPages(pagesRes.data);
            setSmtpProfiles(smtpRes.data);
        } catch (error) {
            console.error("Error fetching resources", error);
        }
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleLaunch = async () => {
        if (!formData.title) {
            showNotification('Please enter a campaign title', 'warning');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // Format dates
            const campaignData = {
                ...formData,
                start_date: formData.start_date ? new Date(formData.start_date).toISOString() : null,
                end_date: formData.end_date ? new Date(formData.end_date).toISOString() : null,
            };

            const response = await axios.post('http://localhost:8000/campaigns/', campaignData, config);
            showNotification('Campaign created successfully!', 'success');
            navigate('/campaigns');
        } catch (error) {
            console.error('Error creating campaign:', error);
            showNotification('Failed to create campaign', 'error');
        }
    };

    const updateFormData = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleGroup = (groupId) => {
        setFormData(prev => ({
            ...prev,
            target_group_ids: prev.target_group_ids.includes(groupId)
                ? prev.target_group_ids.filter(id => id !== groupId)
                : [...prev.target_group_ids, groupId]
        }));
    };

    return (
        <PageContainer maxWidth="max-w-6xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2 mb-2">
                    <Shield className="text-brand-teal" size={32} /> New Campaign
                </h1>
                <p className="text-gray-400 mb-8">Create a phishing simulation campaign in 5 steps.</p>

                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    {steps.map((step, index) => {
                        const StepIcon = step.icon;
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <React.Fragment key={index}>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${isActive ? 'border-brand-teal bg-brand-teal/20 text-brand-teal' :
                                            isCompleted ? 'border-green-500 bg-green-500/20 text-green-500' :
                                                'border-gray-600 bg-gray-800 text-gray-500'
                                        }`}>
                                        {isCompleted ? <Check size={20} /> : <StepIcon size={20} />}
                                    </div>
                                    <span className={`text-xs font-medium ${isActive ? 'text-brand-teal' : isCompleted ? 'text-green-400' : 'text-gray-500'}`}>
                                        {step.name}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`h-0.5 flex-1 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-700'}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-6"
                    >
                        {/* Step 1: Details */}
                        {currentStep === 0 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-4">Campaign Details</h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Title *</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => updateFormData('title', e.target.value)}
                                        className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                        placeholder="e.g. Q1 2026 Phishing Simulation"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => updateFormData('description', e.target.value)}
                                        className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors h-24"
                                        placeholder="Brief description of this campaign..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level</label>
                                        <select
                                            value={formData.difficulty}
                                            onChange={(e) => updateFormData('difficulty', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                        >
                                            <option value="easy">Easy</option>
                                            <option value="medium">Medium</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">Tracking Options</label>
                                    <div className="space-y-2">
                                        {[
                                            { key: 'track_opens', label: 'Track Email Opens' },
                                            { key: 'track_clicks', label: 'Track Link Clicks' },
                                            { key: 'track_submissions', label: 'Track Credential Submissions' }
                                        ].map(({ key, label }) => (
                                            <label key={key} className="flex items-center gap-2 cursor-pointer p-2 hover:bg-white/5 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={formData[key]}
                                                    onChange={(e) => updateFormData(key, e.target.checked)}
                                                    className="w-4 h-4 text-brand-teal bg-gray-700 border-gray-600 rounded focus:ring-brand-teal"
                                                />
                                                <span className="text-gray-300">{label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Targets */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-4">Select Target Groups</h2>
                                <p className="text-gray-400 mb-4">Choose which groups will receive this phishing simulation.</p>

                                {groups.length === 0 ? (
                                    <div className="text-center py-12 text-gray-400">
                                        <Users size={48} className="mx-auto mb-4 opacity-20" />
                                        <p>No groups available. Create groups in User Management first.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {groups.map(group => (
                                            <div
                                                key={group.id}
                                                onClick={() => toggleGroup(group.id)}
                                                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.target_group_ids.includes(group.id)
                                                        ? 'border-brand-teal bg-brand-teal/10'
                                                        : 'border-white/10 bg-white/5 hover:border-white/30'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h3 className="font-bold text-white">{group.name}</h3>
                                                        <p className="text-sm text-gray-400 mt-1">{group.description || 'No description'}</p>
                                                    </div>
                                                    {formData.target_group_ids.includes(group.id) && (
                                                        <Check className="text-brand-teal" size={20} />
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-4 text-sm text-gray-400">
                                    <strong className="text-brand-teal">{formData.target_group_ids.length}</strong> group(s) selected
                                </div>
                            </div>
                        )}

                        {/* Step 3: Content */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-4">Campaign Content</h2>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">Email Template</label>
                                    {templates.length === 0 ? (
                                        <div className="text-center py-8 text-gray-400 bg-gray-900/50 rounded-xl border border-white/10">
                                            <Mail size={32} className="mx-auto mb-2 opacity-20" />
                                            <p className="text-sm">No templates available. Create one in Settings.</p>
                                        </div>
                                    ) : (
                                        <select
                                            value={formData.email_template_id || ''}
                                            onChange={(e) => updateFormData('email_template_id', e.target.value || null)}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                        >
                                            <option value="">-- Select Template --</option>
                                            {templates.map(template => (
                                                <option key={template.id} value={template.id}>{template.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">Landing Page</label>
                                    {landingPages.length === 0 ? (
                                        <div className="text-center py-8 text-gray-400 bg-gray-900/50 rounded-xl border border-white/10">
                                            <Shield size={32} className="mx-auto mb-2 opacity-20" />
                                            <p className="text-sm">No landing pages available. Create one in Settings.</p>
                                        </div>
                                    ) : (
                                        <select
                                            value={formData.landing_page_id || ''}
                                            onChange={(e) => updateFormData('landing_page_id', e.target.value || null)}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                        >
                                            <option value="">-- Select Landing Page --</option>
                                            {landingPages.map(page => (
                                                <option key={page.id} value={page.id}>{page.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Schedule */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-4">Schedule & Delivery</h2>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Start Date</label>
                                        <input
                                            type="datetime-local"
                                            value={formData.start_date}
                                            onChange={(e) => updateFormData('start_date', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">End Date (Expiry)</label>
                                        <input
                                            type="datetime-local"
                                            value={formData.end_date}
                                            onChange={(e) => updateFormData('end_date', e.target.value)}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">SMTP Profile</label>
                                    {smtpProfiles.length === 0 ? (
                                        <div className="text-center py-8 text-gray-400 bg-gray-900/50 rounded-xl border border-white/10">
                                            <Mail size={32} className="mx-auto mb-2 opacity-20" />
                                            <p className="text-sm">No SMTP profiles configured. Add one in Settings.</p>
                                        </div>
                                    ) : (
                                        <select
                                            value={formData.smtp_profile_id || ''}
                                            onChange={(e) => updateFormData('smtp_profile_id', e.target.value || null)}
                                            className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                        >
                                            <option value="">-- Select SMTP Profile --</option>
                                            {smtpProfiles.map(profile => (
                                                <option key={profile.id} value={profile.id}>{profile.name} ({profile.sender_email})</option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Campaign Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => updateFormData('status', e.target.value)}
                                        className="w-full bg-gray-900/50 border border-white/10 rounded-xl p-3 text-white focus:border-brand-teal outline-none transition-colors"
                                    >
                                        <option value="draft">Draft (Save for Later)</option>
                                        <option value="active">Active (Launch Immediately)</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Review */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white mb-4">Review & Launch</h2>

                                <div className="space-y-4">
                                    <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                                        <h3 className="text-sm font-medium text-gray-400 mb-2">Campaign Details</h3>
                                        <p className="text-white font-bold">{formData.title || 'Untitled Campaign'}</p>
                                        <p className="text-sm text-gray-400">{formData.description || 'No description'}</p>
                                        <div className="mt-2 flex gap-2">
                                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">{formData.difficulty}</span>
                                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">{formData.status}</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                                        <h3 className="text-sm font-medium text-gray-400 mb-2">Target Groups</h3>
                                        <p className="text-white">{formData.target_group_ids.length} group(s) selected</p>
                                    </div>

                                    <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                                        <h3 className="text-sm font-medium text-gray-400 mb-2">Content & Delivery</h3>
                                        <ul className="text-sm text-gray-300 space-y-1">
                                            <li>Email Template: {formData.email_template_id ? '✓ Selected' : '✗ Not Selected'}</li>
                                            <li>Landing Page: {formData.landing_page_id ? '✓ Selected' : '✗ Not Selected'}</li>
                                            <li>SMTP Profile: {formData.smtp_profile_id ? '✓ Selected' : '✗ Not Selected'}</li>
                                        </ul>
                                    </div>

                                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                                        <p className="text-yellow-400 text-sm">
                                            ⚠️ Once launched, the campaign will be sent to all selected groups. Make sure all settings are correct.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ChevronLeft size={18} /> Previous
                    </button>

                    {currentStep < steps.length - 1 ? (
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 px-6 py-3 bg-brand-teal hover:bg-teal-600 text-gray-900 font-bold rounded-xl transition-all shadow-lg shadow-teal-500/20"
                        >
                            Next <ChevronRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={handleLaunch}
                            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20"
                        >
                            <Check size={18} /> {formData.status === 'active' ? 'Launch Campaign' : 'Save as Draft'}
                        </button>
                    )}
                </div>
            </motion.div>
        </PageContainer>
    );
};

export default CampaignBuilder;
