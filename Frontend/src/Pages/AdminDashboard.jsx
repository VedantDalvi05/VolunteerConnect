import React, { useState } from 'react';
import {
    Users, Calendar, Clock, CheckCircle, TrendingUp, MoreVertical,
    Search, Filter, Plus, Edit2, Trash2, ChevronLeft, ChevronRight
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';

import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();
    // Mock Data
    const engagementData = [
        { month: 'Jan', volunteers: 65 },
        { month: 'Feb', volunteers: 59 },
        { month: 'Mar', volunteers: 80 },
        { month: 'Apr', volunteers: 81 },
        { month: 'May', volunteers: 56 },
        { month: 'Jun', volunteers: 95 },
    ];

    const categoryData = [
        { name: 'Environment', value: 35, color: '#10B981' }, // Emerald
        { name: 'Education', value: 25, color: '#3B82F6' }, // Blue
        { name: 'Health', value: 20, color: '#EF4444' }, // Red
        { name: 'Community', value: 15, color: '#8B5CF6' }, // Purple
        { name: 'Animals', value: 5, color: '#F59E0B' }, // Amber
    ];

    const topVolunteers = [
        { id: 1, name: 'Sarah Wilson', initials: 'SW', events: 12, hours: 48, score: 950 },
        { id: 2, name: 'Mike Chen', initials: 'MC', events: 10, hours: 42, score: 880 },
        { id: 3, name: 'Jessica Lee', initials: 'JL', events: 9, hours: 38, score: 820 },
        { id: 4, name: 'David Kim', initials: 'DK', events: 8, hours: 35, score: 790 },
        { id: 5, name: 'Emma Davis', initials: 'ED', events: 7, hours: 30, score: 750 },
    ];

    const recentEvents = [
        { id: 1, title: 'City Park Cleanup', date: '2024-03-15', registered: 45, capacity: 50, status: 'Upcoming' },
        { id: 2, title: 'Food Bank Service', date: '2024-03-10', registered: 30, capacity: 30, status: 'Completed' },
        { id: 3, title: 'Beach Cleanup', date: '2024-03-20', registered: 12, capacity: 50, status: 'Upcoming' },
        { id: 4, title: 'Tree Planting', date: '2024-03-05', registered: 25, capacity: 25, status: 'Completed' },
        { id: 5, title: 'Animal Shelter', date: '2024-03-25', registered: 5, capacity: 15, status: 'Cancelled' },
    ];

    const MetricCard = ({ title, value, change, icon: Icon, colorClass }) => (
        <div className={`p-6 rounded-2xl text-white ${colorClass} shadow-lg transition-transform hover:scale-[1.02]`}>
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center text-sm font-medium bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {change}
                </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{value}</h3>
            <p className="text-white/80 text-sm font-medium">{title}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, Admin! Here's what's happening today.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="Total Events Created"
                    value="124"
                    change="+12%"
                    icon={Calendar}
                    colorClass="bg-gradient-to-br from-orange-400 to-yellow-500"
                />
                <MetricCard
                    title="Volunteers Registered"
                    value="2,543"
                    change="+8.5%"
                    icon={Users}
                    colorClass="bg-gradient-to-br from-blue-500 to-cyan-400"
                />
                <MetricCard
                    title="Attendance Rate"
                    value="92%"
                    change="+2.4%"
                    icon={CheckCircle}
                    colorClass="bg-gradient-to-br from-emerald-500 to-green-400"
                />
                <MetricCard
                    title="Hours Contributed"
                    value="14.2k"
                    change="+15%"
                    icon={Clock}
                    colorClass="bg-gradient-to-br from-purple-500 to-pink-500"
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Line Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Volunteer Engagement Trend</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={engagementData}>
                                <defs>
                                    <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6B7280', fontSize: 12 }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="volunteers"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVolunteers)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Doughnut Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Events by Category</h2>
                    <div className="h-80 w-full relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value, entry) => <span className="text-gray-600 text-sm ml-1">{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                            <span className="text-3xl font-bold text-gray-900">124</span>
                            <span className="text-sm text-gray-500">Total Events</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Leaderboard & Recent Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Leaderboard */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-semibold text-gray-900">🏆 Top Volunteers</h2>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                    </div>
                    <div className="divide-y divide-gray-50">
                        {topVolunteers.map((volunteer, index) => (
                            <div key={volunteer.id} className="p-4 flex items-center hover:bg-gray-50 transition-colors cursor-default group">
                                <div className={`
                            w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 
                            ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                        index === 1 ? 'bg-gray-100 text-gray-600' :
                                            index === 2 ? 'bg-orange-100 text-orange-700' : 'bg-blue-50 text-blue-600'}
                        `}>
                                    {index + 1}
                                </div>
                                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3">
                                    {volunteer.initials}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{volunteer.name}</h4>
                                    <p className="text-xs text-gray-500">{volunteer.events} events • {volunteer.hours} hrs</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-gray-900 block">{volunteer.score}</span>
                                    <span className="text-[10px] text-gray-400 uppercase tracking-wide">pts</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Events Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Events</h2>
                        <div className="flex gap-2 w-full sm:w-auto">
                            <div className="relative flex-1 sm:flex-none">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium">
                                <tr>
                                    <th className="px-6 py-4">Event Name</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Capacity</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentEvents.map(event => (
                                    <tr key={event.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-gray-900">{event.title}</td>
                                        <td className="px-6 py-4 text-gray-500">{event.date}</td>
                                        <td className="px-6 py-4 text-gray-500">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-blue-500 rounded-full"
                                                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs">{event.registered}/{event.capacity}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${event.status === 'Upcoming' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                event.status === 'Completed' ? 'bg-green-50 text-green-700 border-green-100' :
                                                    'bg-red-50 text-red-700 border-red-100'
                                                }`}>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors mr-1">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => navigate('/admin/attendance')}
                                                className="ml-1 p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                                                title="Track Attendance"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                        <span>Showing 1-5 of 124</span>
                        <div className="flex gap-2">
                            <button className="p-1 hover:bg-gray-100 rounded disabled:opacity-50" disabled><ChevronLeft className="w-5 h-5" /></button>
                            <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => window.location.href = '/admin/create-event'}
                className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:scale-110 hover:rotate-90 transition-all duration-300 z-50">
                <Plus className="w-8 h-8" />
            </button>

        </div>
    );
};

export default AdminDashboard;
