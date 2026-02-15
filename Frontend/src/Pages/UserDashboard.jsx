import React, { useState } from 'react';
import {
    Clock, Calendar, Award, LogOut, Search, Filter, MapPin,
    ChevronRight, Star, Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserDashboard = () => {
    const { user } = useAuth();

    // Mock Data for User Stats
    const stats = [
        { label: 'Hours Contributed', value: '24', icon: Clock, color: 'bg-blue-100 text-blue-600' },
        { label: 'Events Attended', value: '5', icon: Calendar, color: 'bg-green-100 text-green-600' },
        { label: 'Impact Score', value: '850', icon: Award, color: 'bg-purple-100 text-purple-600' },
    ];

    // Mock Recommendations
    const recommendations = [
        { id: 1, title: 'Beach Cleanup Drive', date: 'Mar 15, 2024', location: 'Santa Monica', category: 'Environment' },
        { id: 2, title: 'Food Bank Helper', date: 'Mar 18, 2024', location: 'Downtown', category: 'Community' },
    ];

    // Mock Registrations
    const myRegistrations = [
        {
            id: 3,
            title: 'Tree Planting Event',
            date: '2024-03-25',
            time: '08:00 AM',
            location: 'City Park',
            status: 'Confirmed'
        },
        {
            id: 4,
            title: 'Animal Shelter Visit',
            date: '2024-04-02',
            time: '10:00 AM',
            location: 'Happy Paws Shelter',
            status: 'Pending'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name || 'Volunteer'}! 👋</h1>
                <p className="text-gray-500 mt-1">Here's your impact summary and upcoming activities.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                        <div className={`p-4 rounded-xl ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: My Registrations */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-900">My Important Dates</h2>
                            <button
                                onClick={() => window.location.href = '/my-registrations'}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                                View Calendar
                            </button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {myRegistrations.map(event => (
                                <div key={event.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-gray-50 transition-colors">
                                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-blue-600 shrink-0">
                                        <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                        <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 text-lg">{event.title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                            <span className="flex items-center gap-1"><Clock size={14} /> {event.time}</span>
                                            <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {event.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Recommendations & Profile */}
                <div className="space-y-8">
                    {/* Recommendations */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Recommended for You</h2>
                        </div>
                        <div className="p-4 space-y-4">
                            {recommendations.map(event => (
                                <div key={event.id} className="group cursor-pointer p-4 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-medium px-2 py-1 rounded bg-gray-100 text-gray-600">{event.category}</span>
                                        <button className="text-gray-400 hover:text-red-500 transition-colors"><Heart size={16} /></button>
                                    </div>
                                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{event.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1"><MapPin size={12} /> {event.location}</p>
                                </div>
                            ))}
                            <button className="w-full py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center gap-1">
                                View All Recommendations <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
