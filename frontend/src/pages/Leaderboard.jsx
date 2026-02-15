import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Medal, TrendingUp } from 'lucide-react';

const leaderboardData = [
    { rank: 1, name: 'Sarah Jenkins', department: 'Engineering', score: 9850, avatar: 'SJ' },
    { rank: 2, name: 'Michael Chen', department: 'Product', score: 9720, avatar: 'MC' },
    { rank: 3, name: 'Jessica Wu', department: 'Finance', score: 9550, avatar: 'JW' },
    { rank: 4, name: 'David Miller', department: 'HR', score: 9100, avatar: 'DM' },
    { rank: 5, name: 'Alex Johnson', department: 'Sales', score: 8950, avatar: 'AJ' },
];

const Leaderboard = () => {
    return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Crown className="text-yellow-400" size={32} /> Security Champions
                        </h1>
                        <p className="text-gray-400 mt-2">Top performers leading the charge in security awareness.</p>
                    </div>
                    <div className="bg-gray-800 p-1 rounded-lg flex text-sm">
                        <button className="px-4 py-2 bg-gray-700 rounded-md text-white font-medium shadow-sm">Weekly</button>
                        <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">All Time</button>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
                    {/* Header Row */}
                    <div className="grid grid-cols-12 gap-4 p-6 border-b border-gray-700 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        <div className="col-span-2 text-center">Rank</div>
                        <div className="col-span-5">User</div>
                        <div className="col-span-3">Department</div>
                        <div className="col-span-2 text-right">Score</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-gray-700">
                        {leaderboardData.map((user, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={user.rank}
                                className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-gray-700/30 transition-colors"
                            >
                                <div className="col-span-2 flex justify-center">
                                    {user.rank === 1 ? (
                                        <div className="w-8 h-8 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center font-bold border border-yellow-400/50">1</div>
                                    ) : user.rank === 2 ? (
                                        <div className="w-8 h-8 bg-gray-400/20 text-gray-300 rounded-full flex items-center justify-center font-bold border border-gray-400/50">2</div>
                                    ) : user.rank === 3 ? (
                                        <div className="w-8 h-8 bg-orange-400/20 text-orange-400 rounded-full flex items-center justify-center font-bold border border-orange-400/50">3</div>
                                    ) : (
                                        <span className="text-gray-500 font-bold font-mono">#{user.rank}</span>
                                    )}
                                </div>
                                <div className="col-span-5 flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center font-bold text-sm shadow-lg">
                                        {user.avatar}
                                    </div>
                                    <span className="font-medium text-white">{user.name}</span>
                                </div>
                                <div className="col-span-3 text-gray-400 text-sm">
                                    {user.department}
                                </div>
                                <div className="col-span-2 text-right font-mono font-bold text-[var(--color-brand-teal)]">
                                    {user.score.toLocaleString()}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
