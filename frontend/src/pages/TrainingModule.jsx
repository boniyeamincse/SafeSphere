import React, { useState } from 'react';
import { BookOpen, CheckCircle, ChevronRight, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TrainingModule = () => {
    const [activeLesson, setActiveLesson] = useState(0);

    const lessons = [
        { id: 1, title: 'Introduction to Phishing', duration: '5 min', type: 'video' },
        { id: 2, title: 'Identifying Suspicious Emails', duration: '8 min', type: 'reading' },
        { id: 3, title: 'Social Engineering Tactics', duration: '6 min', type: 'video' },
        { id: 4, title: 'Final Quiz', duration: '10 min', type: 'quiz' },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-brand-dark)] text-white flex relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-96 bg-[var(--color-brand-blue)]/20 blur-[100px] pointer-events-none z-0" />

            {/* Sidebar */}
            <div className="w-80 bg-gray-900 border-r border-gray-700 p-6 flex flex-col relative z-10">
                <h2 className="text-xl font-bold text-[var(--color-brand-teal)] mb-8 flex items-center gap-2">
                    <BookOpen size={24} /> Training Hub
                </h2>

                <div className="space-y-4">
                    {lessons.map((lesson, index) => (
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            key={lesson.id}
                            onClick={() => setActiveLesson(index)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${activeLesson === index
                                ? 'bg-[var(--color-brand-blue)] border-blue-500 shadow-lg shadow-blue-500/20'
                                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                } border`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${activeLesson === index ? 'bg-blue-500/20' : 'bg-gray-700'}`}>
                                    {lesson.type === 'video' ? <PlayCircle size={18} /> :
                                        lesson.type === 'quiz' ? <CheckCircle size={18} /> :
                                            <BookOpen size={18} />}
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-sm">{lesson.title}</p>
                                    <p className="text-xs text-gray-400">{lesson.duration}</p>
                                </div>
                            </div>
                            {activeLesson === index && <ChevronRight size={16} />}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="aspect-video bg-gray-800 rounded-2xl border border-gray-700 flex items-center justify-center mb-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-teal-500/10 z-0"></div>
                        <PlayCircle size={64} className="text-[var(--color-brand-teal)] opacity-80 group-hover:scale-110 transition-transform duration-300 z-10 cursor-pointer" />
                    </div>

                    <h1 className="text-3xl font-bold mb-4">{lessons[activeLesson].title}</h1>
                    <p className="text-gray-300 leading-relaxed mb-8">
                        Phishing is a cybercrime in which a target or targets are contacted by email, telephone or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data such as personally identifiable information, banking and credit card details, and passwords.
                    </p>

                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <h3 className="text-lg font-semibold mb-4 text-[var(--color-brand-teal)]">Key Takeaways</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-3">
                                <CheckCircle size={18} className="text-blue-500 mt-1" />
                                <span>Check the sender's email address strictly</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={18} className="text-blue-500 mt-1" />
                                <span>Don't click on suspicious links or attachments</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle size={18} className="text-blue-500 mt-1" />
                                <span>Verify urgent requests through a secondary channel</span>
                            </li>
                        </ul>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button className="bg-[var(--color-brand-teal)] hover:bg-teal-600 text-gray-900 px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg shadow-teal-500/20">
                            Complete Lesson
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingModule;
