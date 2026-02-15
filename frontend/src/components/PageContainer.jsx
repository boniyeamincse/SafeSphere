import React from 'react';

const PageContainer = ({ children, maxWidth = 'max-w-7xl' }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-dark via-[#051a42] to-brand-dark text-white p-6 md:p-8 relative overflow-hidden font-sans">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-brand-teal/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-[500px] bg-blue-600/10 blur-[120px] pointer-events-none" />

            <div className={`${maxWidth} mx-auto relative z-10`}>
                {children}
            </div>
        </div>
    );
};

export default PageContainer;
