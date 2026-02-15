import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Calendar, Clock, MapPin, Users, Award, Star, X,
    Share2, Bookmark, CheckCircle, ChevronDown, ChevronUp
} from 'lucide-react';

// Mock detailed data - in a real app, this would be fetched based on ID
const MOCK_EVENT_DETAILS = {
    id: 1,
    title: "Beach Cleanup Drive 2024",
    category: "Environment",
    organizer: "Ocean Guardians",
    date: "Fri, March 15, 2024",
    time: "09:00 AM - 02:00 PM",
    location: "Santa Monica Pier, CA",
    spotsed: 45,
    capacity: 50,
    skills: ["Swimming", "Teamwork"],
    certificate: true,
    description: `Join us for our annual Beach Cleanup Drive! This event aims to remove trash and debris from our beautiful coastline, protecting marine life and ensuring a safe environment for beachgoers. 

  We will be focusing on the north side of the pier, an area that often accumulates plastic waste. All necessary equipment, including gloves, trash pickers, and bags, will be provided. 

  Lunch and refreshments will be served to all volunteers after the cleanup. This is a great opportunity to meet like-minded individuals and make a tangible difference in your community.`,
    image: "🌊",
    rating: 4.8,
    reviewCount: 124,
    reviews: [
        { id: 1, user: "Sarah M.", avatar: "SM", rating: 5, date: "2 days ago", text: "Amazing experience! Well organized and fun." },
        { id: 2, user: "John D.", avatar: "JD", rating: 4, date: "1 week ago", text: "Great cause. Wish there was more parking info." }
    ],
    gallery: ["bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-red-200"] // Placeholders
};

const EventDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [lightboxImage, setLightboxImage] = useState(null);

    // In a real app, use 'id' to fetch data. Using mock for now.
    const event = MOCK_EVENT_DETAILS;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => navigate(-1)}
            ></div>

            {/* Modal Card */}
            <div className="relative bg-white w-full max-w-4xl max-h-full rounded-3xl shadow-2xl overflow-y-auto animate-slideDown hide-scrollbar">

                {/* Close Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors shadow-sm"
                >
                    <X className="w-6 h-6 text-gray-600" />
                </button>

                {/* Header Section */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center rounded-t-3xl border-b border-gray-100">
                    <div className="text-8xl mb-6 transform hover:scale-110 transition-transform duration-300 inline-block cursor-default">
                        {event.image}
                    </div>
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                        {event.category}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {event.title}
                    </h1>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                        <span className="font-medium">by {event.organizer}</span>
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                    </div>
                </div>

                <div className="p-6 md:p-8 space-y-8">
                    {/* Info Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                            <Calendar className="w-6 h-6 text-blue-500 mb-2" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Date</span>
                            <span className="font-semibold text-gray-900">{event.date}</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                            <Clock className="w-6 h-6 text-blue-500 mb-2" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Time</span>
                            <span className="font-semibold text-gray-900">{event.time}</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                            <MapPin className="w-6 h-6 text-blue-500 mb-2" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Location</span>
                            <span className="font-semibold text-gray-900 line-clamp-1">{event.location}</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                            <Users className="w-6 h-6 text-blue-500 mb-2" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Spots</span>
                            <span className="font-semibold text-gray-900">{event.capacity - event.spotsed} left</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                            <Award className="w-6 h-6 text-blue-500 mb-2" />
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Skills needed</span>
                            <span className="font-semibold text-gray-900">{event.skills.join(", ")}</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-2xl group hover:bg-blue-50 transition-colors">
                            <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full mb-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-xs text-gray-500 uppercase tracking-wide">Certificate</span>
                            <span className="font-semibold text-gray-900">{event.certificate ? "Provided" : "None"}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">About the Event</h2>
                        <div className={`prose prose-blue text-gray-600 leading-relaxed ${!isExpanded ? 'line-clamp-4' : ''}`}>
                            {event.description.split('\n').map((paragraph, idx) => (
                                <p key={idx} className="mb-4">{paragraph}</p>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center text-blue-600 font-medium hover:text-blue-700 mt-2"
                        >
                            {isExpanded ? (
                                <>Show Less <ChevronUp className="w-4 h-4 ml-1" /></>
                            ) : (
                                <>Read More <ChevronDown className="w-4 h-4 ml-1" /></>
                            )}
                        </button>
                    </div>

                    {/* Map & Reviews Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Map Section */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
                            <div className="bg-gray-100 rounded-2xl h-64 w-full flex items-center justify-center overflow-hidden relative">
                                {/* Placeholder Map */}
                                <div className="absolute inset-0 bg-gray-200">
                                    <div className="w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black"></div>
                                </div>
                                <div className="z-10 bg-white p-3 rounded-xl shadow-lg flex items-center gap-2">
                                    <MapPin className="text-red-500 w-5 h-5" />
                                    <span className="font-medium text-sm text-gray-900">{event.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Ratings & Reviews */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Reviews</h2>
                                <div className="flex items-center">
                                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
                                    <span className="font-bold text-gray-900">{event.rating}</span>
                                    <span className="text-gray-500 text-sm ml-1">({event.reviewCount})</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {event.reviews.map(review => (
                                    <div key={review.id} className="bg-gray-50 p-4 rounded-xl">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                                                    {review.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 text-sm">{review.user}</p>
                                                    <p className="text-xs text-gray-500">{review.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm">{review.text}</p>
                                    </div>
                                ))}
                                <button className="w-full py-2 text-blue-600 font-medium text-sm hover:bg-blue-50 rounded-lg transition-colors">
                                    View Service Reviews
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Photo Gallery */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Past Event Photos</h2>
                        <div className="grid grid-cols-4 gap-4">
                            {event.gallery.map((bg, idx) => (
                                <div
                                    key={idx}
                                    className={`${bg} aspect-square rounded-xl cursor-pointer hover:opacity-90 transition-opacity`}
                                    onClick={() => setLightboxImage(idx)} // Simple lightbox trigger
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                        <button className="flex-1 bg-[#1A8BF0] hover:bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95 text-lg">
                            Register Now
                        </button>
                        <div className="flex gap-4">
                            <button className="flex-1 sm:w-auto px-8 py-4 bg-white border-2 border-gray-100 hover:border-blue-200 text-gray-700 font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2">
                                <Share2 className="w-5 h-5" />
                                Share
                            </button>
                            <button className="flex-1 sm:w-auto px-8 py-4 bg-white border-2 border-gray-100 hover:border-blue-200 text-gray-700 font-semibold rounded-2xl transition-colors flex items-center justify-center gap-2">
                                <Bookmark className="w-5 h-5" />
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple Lightbox Overlay */}
            {lightboxImage !== null && (
                <div
                    className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <div className={`w-full max-w-3xl aspect-video rounded-xl ${event.gallery[lightboxImage]} flex items-center justify-center text-white`}>
                        {/* Placeholder Content */}
                        Image Preview {lightboxImage + 1}
                    </div>
                    <button className="absolute top-4 right-4 text-white p-2">
                        <X className="w-8 h-8" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default EventDetailsPage;
