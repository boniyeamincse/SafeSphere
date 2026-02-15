import React from 'react';
import { User, Mail, Shield, Settings, Key } from 'lucide-react';

const Profile = () => {
    return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white">Account Settings</h1>

                <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl">
                    {/* Header / Banner */}
                    <div className="h-32 bg-gradient-to-r from-blue-900 to-[var(--color-brand-teal)] relative">
                        <div className="absolute -bottom-12 left-8">
                            <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-gray-800 p-1">
                                <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
                                    <User size={40} className="text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-16 pb-8 px-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Alex Johnson</h2>
                                <p className="text-gray-400">Security Analyst • Engineering</p>
                            </div>
                            <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
                                <Settings size={16} /> Edit Profile
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Personal Info */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold border-b border-gray-700 pb-2 text-[var(--color-brand-teal)]">
                                    Personal Information
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                                        <div className="flex items-center gap-3 text-gray-200">
                                            <User size={18} className="text-gray-500" /> Alex Johnson
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                                        <div className="flex items-center gap-3 text-gray-200">
                                            <Mail size={18} className="text-gray-500" /> alex.j@safesphere.co
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-500 mb-1">Role</label>
                                        <div className="flex items-center gap-3 text-gray-200">
                                            <Shield size={18} className="text-gray-500" /> Administrator
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Security Settings */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold border-b border-gray-700 pb-2 text-[var(--color-brand-teal)]">
                                    Security
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <Key size={20} className="text-blue-400" />
                                            <div>
                                                <p className="font-medium">Password</p>
                                                <p className="text-xs text-gray-400">Last changed 3 months ago</p>
                                            </div>
                                        </div>
                                        <button className="text-sm text-blue-400 hover:text-blue-300">Update</button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                                        <div className="flex items-center gap-3">
                                            <Shield size={20} className="text-green-400" />
                                            <div>
                                                <p className="font-medium">2FA Authentication</p>
                                                <p className="text-xs text-green-400">Enabled</p>
                                            </div>
                                        </div>
                                        <button className="text-sm text-gray-400 hover:text-white">Configure</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
