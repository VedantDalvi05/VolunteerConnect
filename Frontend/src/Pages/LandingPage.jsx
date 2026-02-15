import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import EventCard from '../components/common/EventCard';
import { useAuth } from '../hooks/useAuth';
import { useUI } from '../context/UIContext';
import axios from 'axios';

// Mock Data (Fallback)
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
    // ... other mock events if API fails
];

const CATEGORIES = ["All Categories", "Environment", "Education", "Health", "Community", "Animal Welfare"];
const DATES = ["All Dates", "Today", "This Week", "This Month"];

const LandingPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [selectedDate, setSelectedDate] = useState("All Dates");
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const { openAuthModal } = useUI();

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Try fetching from backend
                const response = await axios.get('http://localhost:5000/api/events');
                setEvents(response.data);
                setFilteredEvents(response.data);
            } catch (error) {
                console.error("Failed to fetch events, using mock data", error);
                setEvents(MOCK_EVENTS);
                setFilteredEvents(MOCK_EVENTS);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    // Filter logic
    useEffect(() => {
        const timer = setTimeout(() => {
            let filtered = events.filter(event => {
                const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    event.description.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = selectedCategory === "All Categories" || event.category === selectedCategory;
                // Date logic to be implemented
                const matchesDate = true;

                return matchesSearch && matchesCategory && matchesDate;
            });
            setFilteredEvents(filtered);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, selectedCategory, selectedDate, events]);

    return (
        <div className="font-sans text-gray-900">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#EFF4F9] to-[#F7FBFE] py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                        Make a Difference Today
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Discover volunteer opportunities and create lasting impact in your community. Join thousands of changemakers.
                    </p>
                    {!user && (
                        <div className="mt-8 flex justify-center gap-4">
                            <button
                                onClick={() => openAuthModal('signup')}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Start Volunteering
                            </button>
                            <button
                                onClick={() => openAuthModal('login')}
                                className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 px-8 py-3 rounded-full font-semibold text-lg transition-all shadow-sm hover:shadow-md"
                            >
                                Log In
                            </button>
                        </div>
                    )}
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
            </section>

            {/* Search & Filter Bar */}
            <div className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-16 z-40">
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
                            <EventCard key={event.id || event._id} event={event} />
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
