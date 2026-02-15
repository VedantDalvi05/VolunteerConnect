import React, { useState } from 'react';
import { Search, QrCode, CheckCircle, XCircle, ChevronDown, Filter, User } from 'lucide-react';

const AttendanceTracking = () => {
    // Mock Events Data for Dropdown
    const events = [
        { id: 1, title: 'Beach Cleanup Drive 2024', date: '2024-03-15' },
        { id: 2, title: 'Community Food Bank', date: '2024-03-16' },
        { id: 3, title: 'Tree Planting Event', date: '2024-03-25' },
    ];

    const [selectedEvent, setSelectedEvent] = useState(events[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [volunteers, setVolunteers] = useState([
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', status: 'checked-in', time: '08:45 AM' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', status: 'pending', time: '-' },
        { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', status: 'pending', time: '-' },
        { id: 4, name: 'Diana Prince', email: 'diana@example.com', status: 'checked-in', time: '09:00 AM' },
        { id: 5, name: 'Evan Wright', email: 'evan@example.com', status: 'pending', time: '-' },
    ]);

    const handleCheckInToggle = (id) => {
        setVolunteers(volunteers.map(vol => {
            if (vol.id === id) {
                return {
                    ...vol,
                    status: vol.status === 'checked-in' ? 'pending' : 'checked-in',
                    time: vol.status === 'checked-in' ? '-' : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
            }
            return vol;
        }));
    };

    const filteredVolunteers = volunteers.filter(vol =>
        vol.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vol.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Attendance Tracking</h1>
                        <p className="text-gray-500 mt-1">Manage volunteer check-ins and attendance records.</p>
                    </div>

                    {/* Event Selector */}
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-gray-200 text-gray-900 py-3 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium shadow-sm w-full md:w-64 cursor-pointer"
                            value={selectedEvent.id}
                            onChange={(e) => {
                                const event = events.find(ev => ev.id === parseInt(e.target.value));
                                setSelectedEvent(event);
                            }}
                        >
                            {events.map(event => (
                                <option key={event.id} value={event.id}>{event.title}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* QR Code Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Event QR Code</h2>
                            <div className="bg-gray-100 aspect-square rounded-xl flex items-center justify-center mb-4 relative overflow-hidden group">
                                <QrCode className="w-32 h-32 text-gray-400" />
                                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                        Download QR
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500 mb-6">
                                Volunteers can scan this code with their mobile app to automatically check in.
                            </p>
                            <div className="p-4 bg-blue-50 rounded-xl">
                                <span className="block text-2xl font-bold text-blue-600 mb-1">
                                    {volunteers.filter(v => v.status === 'checked-in').length} / {volunteers.length}
                                </span>
                                <span className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Checked In</span>
                            </div>
                        </div>
                    </div>

                    {/* Volunteer List Section */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
                            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <h2 className="text-lg font-semibold text-gray-900">Volunteer List</h2>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search volunteer..."
                                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 text-gray-600 text-sm font-medium">
                                        <tr>
                                            <th className="px-6 py-4">Volunteer</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Check-in Time</th>
                                            <th className="px-6 py-4 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredVolunteers.map(volunteer => (
                                            <tr key={volunteer.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                            <User size={16} />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">{volunteer.name}</div>
                                                            <div className="text-xs text-gray-500">{volunteer.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${volunteer.status === 'checked-in'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {volunteer.status === 'checked-in' ? 'Present' : 'Pending'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                                                    {volunteer.time}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleCheckInToggle(volunteer.id)}
                                                        className={`p-2 rounded-lg transition-colors ${volunteer.status === 'checked-in'
                                                                ? 'text-red-600 hover:bg-red-50'
                                                                : 'text-green-600 hover:bg-green-50'
                                                            }`}
                                                        title={volunteer.status === 'checked-in' ? "Undo Check-in" : "Mark Present"}
                                                    >
                                                        {volunteer.status === 'checked-in' ? (
                                                            <XCircle size={20} />
                                                        ) : (
                                                            <CheckCircle size={20} />
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceTracking;
