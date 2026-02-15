import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Shield, Clock } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Completed', value: 75 },
    { name: 'Remaining', value: 25 },
];
const COLORS = ['#00BFA6', '#1F2937'];

const UserDashboard = () => {
    return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] text-white p-8">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">Hello, <span className="text-[var(--color-brand-teal)]">Alex</span></h1>
                    <p className="text-gray-400">You're making great progress in becoming a security champion!</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <motion.div whileHover={{ y: -5 }} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Trophy size={64} /></div>
                        <h3 className="text-gray-400 font-medium mb-2">Total Score</h3>
                        <p className="text-3xl font-bold text-yellow-400">2,450</p>
                        <div className="mt-4 text-xs text-green-400 flex items-center gap-1">Top 5% of users</div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Target size={64} /></div>
                        <h3 className="text-gray-400 font-medium mb-2">Modules Done</h3>
                        <p className="text-3xl font-bold text-[var(--color-brand-teal)]">8/12</p>
                        <div className="mt-4 text-xs text-gray-500">2 pending this week</div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Shield size={64} /></div>
                        <h3 className="text-gray-400 font-medium mb-2">Phishing Simulation</h3>
                        <p className="text-3xl font-bold text-green-500">Passed</p>
                        <div className="mt-4 text-xs text-gray-500">Last check: 2 days ago</div>
                    </motion.div>

                    <motion.div whileHover={{ y: -5 }} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10"><Clock size={64} /></div>
                        <h3 className="text-gray-400 font-medium mb-2">Time Spent</h3>
                        <p className="text-3xl font-bold text-blue-400">4h 12m</p>
                        <div className="mt-4 text-xs text-gray-500">Across all modules</div>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Progress */}
                    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 lg:col-span-2">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Target className="text-[var(--color-brand-teal)]" size={20} /> Current Training
                        </h3>
                        <div className="space-y-6">
                            {['Password Security Basics', 'Social Engineering Advanced'].map((item, i) => (
                                <div key={i} className="bg-gray-900/50 p-5 rounded-xl border border-gray-700/50 hover:border-[var(--color-brand-blue)] transition-colors">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-semibold">{item}</h4>
                                        <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded">In Progress</span>
                                    </div>
                                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: i === 0 ? '75%' : '45%' }}
                                            className="bg-gradient-to-r from-blue-600 to-teal-400 h-full rounded-full"
                                        />
                                    </div>
                                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                                        <span>Example Module {i + 1}</span>
                                        <span>{i === 0 ? '75%' : '45%'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Achievement Card */}
                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700 flex flex-col items-center justify-center text-center">
                        <div className="relative w-40 h-40 mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-3xl font-bold text-white">75%</span>
                                <span className="text-xs text-gray-500">Complete</span>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Overall Progress</h3>
                        <p className="text-sm text-gray-400 mb-6">You're crushing it! Keep up the momentum to earn your next badge.</p>
                        <button className="w-full py-3 rounded-xl bg-[var(--color-brand-blue)] hover:bg-blue-700 text-white font-medium transition-colors">
                            Continue Learning
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
