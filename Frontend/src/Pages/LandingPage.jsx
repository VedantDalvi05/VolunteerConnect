import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Search, MapPin, Calendar, Clock, User, Share2, Filter, X, Menu, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Mock Data
const MOCK_EVENTS = [
    {
        id: 1,
        title: "Beach Cleanup Drive 2024",
        description: "Join us in making our beaches cleaner and safer for marine life. We'll provide gloves, bags, and refreshments for all volunteers.",
        category: "Environment",
        date: "2024-03-15",
        time: "09:00 AM",
        location: "Santa Monica Pier",
        organizer: "Ocean Guardians",
        registered: 45,
        capacity: 50,
        image: "🌊"
    },
    {
        id: 2,
        title: "Community Food Bank",
        description: "Help sort and distribute food packages to families in need. Your time can make a real difference in fighting hunger.",
        category: "Community",
        date: "2024-03-16",
        time: "10:00 AM",
        location: "Downtown Community Center",
        organizer: "Food For All",
        registered: 12,
        capacity: 30,
        image: "🥫"
    },
    {
        id: 3,
        title: "Math Tutoring for Kids",
        description: "Volunteer as a math tutor for elementary school students. Help them build confidence and skills in mathematics.",
        category: "Education",
        date: "2024-03-18",
        time: "03:00 PM",
        location: "Public Library",
        organizer: "Learn & Grow",
        registered: 5,
        capacity: 10,
        image: "📚"
    },
    {
        id: 4,
        title: "Animal Shelter Walk",
        description: "Spend your afternoon walking and playing with rescue dogs. They need love, exercise, and socialization.",
        category: "Animal Welfare",
        date: "2024-03-20",
        time: "02:00 PM",
        location: "Happy Paws Shelter",
        organizer: "Pet Rescue",
        registered: 8,
        capacity: 15,
        image: "🐕"
    },
    {
        id: 5,
        title: "Senior Home Visit",
        description: "Visit the local senior center to play games, chat, and share stories with the residents. Brighten their day!",
        category: "Community",
        date: "2024-03-22",
        time: "01:00 PM",
        location: "Sunset Senior Living",
        organizer: "Care Connect",
        registered: 15,
        capacity: 20,
        image: "👵"
    },
    {
        id: 6,
        title: "Tree Planting Event",
        description: "Help us plant 500 new trees in the city park. Bring your own shovel if you have one, or use ours.",
        category: "Environment",
        date: "2024-03-25",
        time: "08:00 AM",
        location: "City Central Park",
        organizer: "Green City",
        registered: 80,
        capacity: 100,
        image: "🌳"
    }
];

const CATEGORIES = ["All Categories", "Environment", "Education", "Health", "Community", "Animal Welfare"];
const DATES = ["All Dates", "Today", "This Week", "This Month"];

const LandingPage = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedDate, setSelectedDate] = useState("All Dates");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            filterEvents();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, selectedCategory, selectedDate]);

    const filterEvents = () => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            let filtered = MOCK_EVENTS.filter(event => {
                const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    event.description.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = selectedCategory === "All Categories" || event.category === selectedCategory;
                // Simplified date logic for mock data
                const matchesDate = true; // Implement actual date logic if needed

                return matchesSearch && matchesCategory && matchesDate;
            });
            setFilteredEvents(filtered);
            setLoading(false);
        }, 500);
    };

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
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            {/* Navbar */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                V
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">VolunteerConnect</span>
                        </div>

                        <div className="hidden md:flex items-center gap-6">
                            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Events</a>
                            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About Us</a>
                            <div className="w-px h-6 bg-gray-200"></div>
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => {
                                            if (user.role === 'ngo_admin') {
                                                navigate('/admin/dashboard');
                                            } else {
                                                navigate('/dashboard');
                                            }
                                        }}
                                        className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                                    >
                                        Dashboard
                                    </button>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                    <button
                                        onClick={logout}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsAuthModalOpen(true)}
                                        className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setIsAuthModalOpen(true)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#EFF4F9] to-[#F7FBFE] py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Make a Difference Today
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Discover volunteer opportunities and create lasting impact in your community. Join thousands of changemakers.
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
            </section>

            {/* Search & Filter Bar */}
            <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 relative z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 [background:white] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow shadow-sm"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
                            <select
                                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-colors cursor-pointer"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>

                            <select
                                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-gray-300 transition-colors cursor-pointer"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            >
                                {DATES.map(date => (
                                    <option key={date} value={date}>{date}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    // Loading Skeleton
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-96 animate-pulse">
                                <div className="h-48 bg-gray-200 w-full mb-4"></div>
                                <div className="p-6">
                                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
                                onClick={() => navigate(`/ event / ${event.id} `)}
                            >
                                {/* Card Image */}
                                <div className="h-48 bg-gray-50 flex items-center justify-center text-6xl relative overflow-hidden group-hover:bg-blue-50 transition-colors">
                                    <span className="transform group-hover:scale-110 transition-transform duration-300">{event.image}</span>
                                    <span className={`absolute top - 4 right - 4 px - 3 py - 1 rounded - full text - xs font - medium ${getCategoryColor(event.category)} `}>
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
                                            {event.date}
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
                                            <span>{event.registered} volunteers</span>
                                            <span>{Math.round((event.registered / event.capacity) * 100)}% filled</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                                style={{ width: `${(event.registered / event.capacity) * 100}% ` }}
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
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            We couldn't find any events matching your criteria. Try adjusting your filters or search terms.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("All Categories");
                                setSelectedDate("All Dates");
                            }}
                            className="text-blue-600 font-medium hover:text-blue-700 bg-blue-50 px-6 py-2.5 rounded-full hover:bg-blue-100 transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
};

export default LandingPage;
