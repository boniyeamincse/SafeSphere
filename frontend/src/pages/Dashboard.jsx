import React from 'react';
import { Shield, Zap, Users, AlertTriangle, Target, CheckCircle } from 'lucide-react';

import DashboardHeader from '../components/dashboard/DashboardHeader';
import SummaryCard from '../components/dashboard/SummaryCard';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';
import RecentActivity from '../components/dashboard/RecentActivity';
import QuickActions from '../components/dashboard/QuickActions';

import PageContainer from '../components/PageContainer';

const Dashboard = () => {
    const displayData = [
        { title: 'Total Campaigns', value: '24', icon: Shield, color: 'blue', trend: 12 },
        { title: 'Active Campaigns', value: '5', icon: Zap, color: 'yellow', trend: 0 },
        { title: 'Training Done', value: '1,250', icon: CheckCircle, color: 'green', trend: 8 },
        { title: 'Vulnerable Users', value: '14', icon: AlertTriangle, color: 'red', trend: -2 },
        { title: 'Top Earners', value: '85', icon: Target, color: 'purple', trend: 5 },
    ];

    return (
        <PageContainer maxWidth="max-w-[1600px]">
            <DashboardHeader />

            {/* Hero / Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                {displayData.map((data, index) => (
                    <SummaryCard key={index} {...data} />
                ))}
            </div>

            {/* Main Content Area */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Charts take up 3 columns on large screens */}
                <div className="xl:col-span-3">
                    <AnalyticsSection />
                </div>

                {/* Recent Activity takes up 1 column */}
                <div className="xl:col-span-1">
                    <RecentActivity />
                </div>
            </div>

            {/* Floating Actions */}
            <QuickActions />
        </PageContainer>
    );
};

export default Dashboard;
