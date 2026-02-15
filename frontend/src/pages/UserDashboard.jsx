import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Shield, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import PageContainer from '../components/PageContainer';

const data = [
    { name: 'Completed', value: 75 },
    { name: 'Remaining', value: 25 },
];
const COLORS = ['#00BFA6', '#1F2937'];

const UserDashboard = () => {
    return (
        <PageContainer maxWidth="max-w-7xl">
            {/* Welcome Header */}
            <div className="mb-12">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-2"
                >
                    Hello, <span className="text-brand-teal">Alex</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400"
                >
                    You're making great progress in becoming a security champion!
                </motion.p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                {[
                    { title: "Total Score", value: "2,450", icon: Trophy, color: "text-yellow-400", sub: "Top 5% of users", delay: 0.1 },
                    { title: "Modules Done", value: "8/12", icon: BookOpen, color: "text-brand-teal", sub: "2 pending this week", delay: 0.2 },
                    { title: "Phishing Sim", value: "Passed", icon: Shield, color: "text-green-500", sub: "Last check: 2 days ago", delay: 0.3 },
                    { title: "Time Spent", value: "4h 12m", icon: Clock, color: "text-blue-400", sub: "Across all modules", delay: 0.4 }
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: stat.delay }}
                        whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)' }}
                        className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
                            <stat.icon size={64} />
                        </div>
                        <h3 className="text-gray-400 font-medium mb-2">{stat.title}</h3>
                        <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        <div className="mt-4 text-xs text-gray-500">{stat.sub}</div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Progress */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 lg:col-span-2"
                >
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                        <Target className="text-brand-teal" size={20} /> Current Training
                    </h3>
                    <div className="space-y-6">
                        {['Password Security Basics', 'Social Engineering Advanced'].map((item, i) => (
                            <div key={i} className="bg-gray-900/40 p-5 rounded-xl border border-white/5 hover:border-brand-teal/50 transition-colors group">
                                <div className="flex justify-between items-center mb-3">
                                    <h4 className="font-semibold text-gray-200 group-hover:text-white transition-colors">{item}</h4>
                                    <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded border border-blue-500/20">In Progress</span>
                                </div>
                                <div className="w-full bg-gray-700/50 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: i === 0 ? '75%' : '45%' }}
                                        transition={{ duration: 1, delay: 0.8 }}
                                        className="bg-gradient-to-r from-blue-600 to-brand-teal h-full rounded-full"
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-gray-400">
                                    <span>Module {i + 1}</span>
                                    <span>{i === 0 ? '75%' : '45%'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Achievement Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-8 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center shadow-xl"
                >
                    <div className="relative w-48 h-48 mb-6">
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
                                <Tooltip contentStyle={{ backgroundColor: '#111827', border: 'none', borderRadius: '8px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-4xl font-bold text-white">75%</span>
                            <span className="text-sm text-gray-400">Complete</span>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Overall Progress</h3>
                    <p className="text-sm text-gray-400 mb-6">You're crushing it! Keep up the momentum to earn your next badge.</p>
                    <button className="w-full py-3 rounded-xl bg-brand-teal text-white font-bold hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 hover:-translate-y-1">
                        Continue Learning
                    </button>
                </motion.div>
            </div>
        </PageContainer>
    );
};

export default UserDashboard;
