import React, { useState } from 'react';
import { Calendar, MapPin, Clock, AlertCircle, CheckCircle, Download, X } from 'lucide-react';

const MyRegistrations = () => {
    const [activeTab, setActiveTab] = useState('upcoming');

    // Mock Data
    const registrations = {
        upcoming: [
            { id: 1, title: 'Beach Cleanup Drive', date: 'Mar 15, 2024', time: '09:00 AM', location: 'Santa Monica', image: '🌊' },
            { id: 2, title: 'Food Bank Service', date: 'Mar 18, 2024', time: '10:00 AM', location: 'Downtown', image: '🥫' },
        ],
        past: [
            { id: 3, title: 'Tree Planting', date: 'Feb 10, 2024', time: '08:00 AM', location: 'City Park', image: '🌳', hours: 4 },
            { id: 4, title: 'Animal Shelter', date: 'Jan 25, 2024', time: '02:00 PM', location: 'Happy Paws', image: '🐕', hours: 3 },
        ],
        cancelled: [
            { id: 5, title: 'Senior Home Visit', date: 'Mar 05, 2024', time: '01:00 PM', location: 'Sunset Living', image: '👵', reason: 'Personal Emergency' },
        ]
    };

    const EventCard = ({ event, type }) => (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row">
            <div className="h-32 md:h-auto md:w-48 bg-gray-50 flex items-center justify-center text-4xl">
                {event.image}
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        {type === 'past' && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                                <CheckCircle size={12} className="mr-1" /> Completed
                            </span>
                        )}
                        {type === 'cancelled' && (
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-medium flex items-center">
                                <X size={12} className="mr-1" /> Cancelled
                            </span>
                        )}
                    </div>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                        <p className="flex items-center"><Calendar size={14} className="mr-2" /> {event.date}</p>
                        <p className="flex items-center"><Clock size={14} className="mr-2" /> {event.time}</p>
                        <p className="flex items-center"><MapPin size={14} className="mr-2" /> {event.location}</p>
                        {type === 'cancelled' && (
                            <p className="text-red-500 mt-2 text-xs">Reason: {event.reason}</p>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    {type === 'upcoming' && (
                        <>
                            <button className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 py-2 rounded-lg text-sm font-medium transition-colors">
                                Cancel Registration
                            </button>
                            <button className="flex-1 bg-blue-600 text-white hover:bg-blue-700 py-2 rounded-lg text-sm font-medium transition-colors">
                                View Details
                            </button>
                        </>
                    )}
                    {type === 'past' && (
                        <button className="flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium transition-colors">
                            <Download size={16} /> Download Certificate
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Registrations</h1>
                <p className="text-gray-500 mb-8">Track your upcoming events and volunteer history.</p>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                    {['upcoming', 'past', 'cancelled'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 text-sm font-medium capitalize transition-colors border-b-2 ${activeTab === tab
                                    ? 'border-blue-600 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {registrations[activeTab].length > 0 ? (
                        registrations[activeTab].map(event => (
                            <EventCard key={event.id} event={event} type={activeTab} />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
                            <AlertCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-lg font-medium text-gray-900">No {activeTab} registrations</h3>
                            <p className="text-gray-500 text-sm">You don't have any events in this category yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyRegistrations;
