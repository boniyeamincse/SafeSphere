import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, Star, Shield, Zap } from 'lucide-react';
import axios from 'axios';

const BADGE_DEFINITIONS = [
    { name: 'First Defender', description: 'Complete your first training module', icon: Shield, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { name: 'Phish Slayer', description: 'Report 5 simulated phishing emails', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { name: 'Security Guru', description: 'Score 100% on 3 quizzes', icon: Star, color: 'text-[var(--color-brand-teal)]', bg: 'bg-teal-500/10' },
    { name: 'Iron Wall', description: 'Maintain a secure status for 1 month', icon: Lock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { name: 'Campaign Creator', description: 'Launch your first phishing campaign', icon: Award, color: 'text-pink-400', bg: 'bg-pink-500/10' },
];

import PageContainer from '../components/PageContainer';

const Achievements = () => {
    const [unlockedBadges, setUnlockedBadges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:8000/users/me/achievements', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUnlockedBadges(response.data.map(a => a.badge_name));
            } catch (error) {
                console.error("Failed to fetch achievements", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAchievements();
    }, []);

    const displayBadges = BADGE_DEFINITIONS.map(def => ({
        ...def,
        unlocked: unlockedBadges.includes(def.name)
    }));

    return (
        <PageContainer maxWidth="max-w-6xl">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-brand-teal)] to-blue-500">
                    Your Hall of Fame
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Track your progress and showcase your commitment to cybersecurity. Unlock badges by completing training and mastering security concepts.
                </p>
            </div>

            {loading ? (
                <div className="text-center text-gray-500">Loading achievements...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayBadges.map((badge, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className={`relative bg-gray-800 rounded-2xl p-6 border ${badge.unlocked ? 'border-gray-700' : 'border-gray-700/50 opacity-60'
                                } text-center group transition-colors`}
                        >
                            {!badge.unlocked && (
                                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-10">
                                    <Lock className="text-gray-500" size={32} />
                                </div>
                            )}

                            <div className={`w-24 h-24 mx-auto rounded-full ${badge.bg} flex items-center justify-center mb-6 shadow-lg ${badge.unlocked ? `shadow-${badge.color.split('-')[1]}-500/20` : 'shadow-none'}`}>
                                <badge.icon size={40} className={badge.color} />
                            </div>

                            <h3 className="text-xl font-bold mb-2">{badge.name}</h3>
                            <p className="text-sm text-gray-400">{badge.description}</p>

                            {badge.unlocked && (
                                <div className="mt-6 pt-4 border-t border-gray-700 text-xs font-mono text-[var(--color-brand-teal)]">
                                    UNLOCKED
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </PageContainer>
    );
};

export default Achievements;
