import React from 'react';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const RecentActivity = () => {
    const activities = [
        { id: 1, type: 'campaign', message: 'Phishing Campaign "Q4 Drill" launched', time: '2 mins ago', status: 'info' },
        { id: 2, type: 'alert', message: '5 users failed "Suspicious Link" test', time: '1 hour ago', status: 'critical' },
        { id: 3, type: 'training', message: 'Engineering Team completed "OWASP Top 10"', time: '3 hours ago', status: 'success' },
        { id: 4, type: 'user', message: 'New user "Sarah Connor" added', time: '5 hours ago', status: 'info' },
        { id: 5, type: 'alert', message: 'Unusual login attempt detected: User ID #402', time: 'Yesterday', status: 'warning' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'warning': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            case 'success': return 'text-green-400 bg-green-400/10 border-green-400/20';
            default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
        }
    };

    const getIcon = (status) => {
        switch (status) {
            case 'critical': return <AlertCircle size={16} />;
            case 'success': return <CheckCircle size={16} />;
            default: return <Clock size={16} />;
        }
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-lg backdrop-blur-sm h-full">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <Clock size={20} className="text-[var(--color-brand-teal)]" /> Recent Activity
            </h3>

            <div className="space-y-4">
                {activities.map((activity) => (
                    <div
                        key={activity.id}
                        className={`flex items-start gap-4 p-4 rounded-xl border transition-all hover:bg-gray-700/50 ${getStatusColor(activity.status)}`}
                    >
                        <div className="mt-1">{getIcon(activity.status)}</div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-200">{activity.message}</p>
                            <span className="text-xs opacity-70 mt-1 block">{activity.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-6 py-2 text-sm text-center text-gray-400 hover:text-white transition-colors border-t border-gray-700 pt-4">
                View All Activity
            </button>
        </div>
    );
};

export default RecentActivity;
