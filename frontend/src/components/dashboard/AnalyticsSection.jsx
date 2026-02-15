import React from 'react';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const AnalyticsSection = () => {
    const campaignData = [
        { name: 'Q1', openRate: 45, clickRate: 12 },
        { name: 'Q2', openRate: 30, clickRate: 8 },
        { name: 'Q3', openRate: 25, clickRate: 5 },
        { name: 'Q4', openRate: 20, clickRate: 3 },
    ];

    const trainingData = [
        { name: 'Jan', completion: 20 },
        { name: 'Feb', completion: 45 },
        { name: 'Mar', completion: 60 },
        { name: 'Apr', completion: 85 },
        { name: 'May', completion: 92 },
    ];

    const roleData = [
        { name: 'Admin', value: 5 },
        { name: 'Dev', value: 30 },
        { name: 'HR', value: 15 },
        { name: 'Sales', value: 50 },
    ];
    const PIE_COLORS = ['#60A5FA', '#34D399', '#F472B6', '#A78BFA'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {/* Campaign Performance Bar Chart */}
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-6">Campaign Performance</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={campaignData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                            <XAxis dataKey="name" stroke="#9CA3AF" tickLine={false} />
                            <YAxis stroke="#9CA3AF" tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                itemStyle={{ color: '#E5E7EB' }}
                            />
                            <Bar dataKey="openRate" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Open Rate %" />
                            <Bar dataKey="clickRate" fill="#00BFA6" radius={[4, 4, 0, 0]} name="Click Rate %" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Training Progress Line Chart */}
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-6">Training Completion Trend</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trainingData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                            <XAxis dataKey="name" stroke="#9CA3AF" tickLine={false} />
                            <YAxis stroke="#9CA3AF" tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="completion"
                                stroke="#00BFA6"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#111827', strokeWidth: 2 }}
                                activeDot={{ r: 6, fill: '#00BFA6' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* User Distribution Pie Chart */}
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg backdrop-blur-sm lg:col-span-2 xl:col-span-1">
                <h3 className="text-lg font-semibold text-white mb-6">User Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={roleData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {roleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 text-xs text-gray-400 mt-[-20px]">
                    {roleData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }} />
                            {entry.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnalyticsSection;
