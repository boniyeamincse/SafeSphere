import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserPlus, Search, Edit2, Trash2, Layers } from 'lucide-react';
import PageContainer from '../components/PageContainer';
import { useNotification } from '../context/NotificationContext';

const UserManagement = () => {
    const { showNotification } = useNotification();
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('users'); // 'users' or 'groups'

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [usersRes, groupsRes] = await Promise.all([
                axios.get('http://localhost:8000/users/', config),
                axios.get('http://localhost:8000/groups/', config) // Assuming endpoint exists
            ]);

            setUsers(usersRes.data);
            setGroups(groupsRes.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data", error);
            // specific error handling if groups endpoint doesn't exist yet
            setLoading(false);
        }
    };

    return (
        <PageContainer maxWidth="max-w-7xl">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        <Users className="text-brand-teal" size={32} /> User & Group Management
                    </h1>
                    <p className="text-gray-400 mt-1">Manage system access and organizational structure.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-2 bg-brand-teal hover:bg-teal-600 text-gray-900 font-bold rounded-xl transition-all shadow-lg shadow-teal-500/20">
                    <UserPlus size={18} /> Add New
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-6 border-b border-white/10">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 font-medium transition-colors border-b-2 ${activeTab === 'users' ? 'border-brand-teal text-brand-teal' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                    All Users
                </button>
                <button
                    onClick={() => setActiveTab('groups')}
                    className={`px-4 py-2 font-medium transition-colors border-b-2 ${activeTab === 'groups' ? 'border-brand-teal text-brand-teal' : 'border-transparent text-gray-400 hover:text-white'}`}
                >
                    Groups
                </button>
            </div>

            {/* Content */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
                {activeTab === 'users' ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/10 text-gray-400 text-sm uppercase tracking-wider">
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Group</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-gray-300">
                                {users.map(user => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-4 font-medium text-white">{user.name}</td>
                                        <td className="p-4">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-400' :
                                                    user.role === 'trainer' ? 'bg-blue-500/20 text-blue-400' :
                                                        'bg-gray-700 text-gray-400'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {user.group_id ? (
                                                <span className="flex items-center gap-1 text-brand-teal">
                                                    <Layers size={14} />
                                                    {groups.find(g => g.id === user.group_id)?.name || 'Unknown Group'}
                                                </span>
                                            ) : (
                                                <span className="text-gray-600 italic">No Group</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right flex justify-end gap-2">
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-blue-400"><Edit2 size={16} /></button>
                                            <button className="p-2 hover:bg-white/10 rounded-lg text-red-400"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-400">
                        <Layers size={48} className="mx-auto mb-4 opacity-20" />
                        <h3 className="text-lg font-medium text-white">Group Management</h3>
                        <p>Detailed group management features coming soon.</p>
                        <ul className="mt-4 text-left max-w-sm mx-auto space-y-2">
                            {groups.map(group => (
                                <li key={group.id} className="bg-white/5 p-3 rounded-lg border border-white/10 flex justify-between">
                                    <span>{group.name}</span>
                                    <span className="text-xs bg-gray-700 px-2 py-1 rounded">{group.description || 'No description'}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </PageContainer>
    );
};

export default UserManagement;
