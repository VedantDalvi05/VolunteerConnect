import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useUI } from '../../context/UIContext';
import AuthModal from '../modals/AuthModal';

const Header = () => {
    const { user, logout } = useAuth();
    const { isAuthModalOpen, closeAuthModal, openAuthModal } = useUI();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleDashboardClick = () => {
        if (user.role === 'ngo_admin') {
            navigate('/admin/dashboard');
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <>
            <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                V
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                VolunteerConnect
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
                            <Link to="/events" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Events</Link>
                            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">About Us</Link>

                            <div className="w-px h-6 bg-gray-200"></div>

                            {user ? (
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={handleDashboardClick}
                                        className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                                    >
                                        Dashboard
                                    </button>
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
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
                                        onClick={() => openAuthModal('login')}
                                        className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => openAuthModal('signup')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-gray-600 hover:text-gray-900 focus:outline-none"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Home</Link>
                            <Link to="/events" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Events</Link>
                            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">About Us</Link>
                            {user ? (
                                <>
                                    <button onClick={handleDashboardClick} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">Dashboard</button>
                                    <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50">Logout</button>
                                </>
                            ) : (
                                <button onClick={() => openAuthModal('login')} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50">Login / Sign Up</button>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
        </>
    );
};

export default Header;
