import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, Share2 } from 'lucide-react';

const EventCard = ({ event }) => {
    const navigate = useNavigate();

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Environment': return 'bg-green-100 text-green-800';
            case 'Education': return 'bg-blue-100 text-blue-800';
            case 'Health': return 'bg-red-100 text-red-800';
            case 'Community': return 'bg-purple-100 text-purple-800';
            case 'Animal Welfare': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
            onClick={() => navigate(`/event/${event.id || event._id}`)}
        >
            {/* Card Image */}
            <div className="h-48 bg-gray-50 flex items-center justify-center text-6xl relative overflow-hidden group-hover:bg-blue-50 transition-colors">
                {event.image && !event.image.startsWith('http') && !event.image.includes('/') ? (
                    <span className="transform group-hover:scale-110 transition-transform duration-300">{event.image}</span>
                ) : (
                    <img
                        src={event.image || "https://via.placeholder.com/300"}
                        alt={event.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                )}
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                    {event.category}
                </span>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
                    {event.description}
                </p>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2 text-gray-400" />
                        {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        {event.organizer}
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{event.registeredCount || event.registered || 0} volunteers</span>
                        <span>{Math.round(((event.registeredCount || event.registered || 0) / event.capacity) * 100)}% filled</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${((event.registeredCount || event.registered || 0) / event.capacity) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-auto">
                    <button className="flex-1 bg-[#1A8BF0] hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-full transition-colors shadow-sm hover:shadow-md active:transform active:scale-95">
                        Register Now
                    </button>
                    <button className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
