import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                V
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                VolunteerConnect
                            </span>
                        </div>
                        <p className="text-gray-500 mb-6 leading-relaxed">
                            Empowering communities through seamless volunteering connections. Join us in making a difference today.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Our Mission</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Success Stories</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">For Volunteers</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Browse Events</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">My Dashboard</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">Safety Guidelines</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-500">
                                <MapPin size={20} className="text-blue-600 mt-1" />
                                <span>123 Community Drive,<br />San Francisco, CA 94105</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500">
                                <Phone size={20} className="text-blue-600" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500">
                                <Mail size={20} className="text-blue-600" />
                                <span>hello@volunteerconnect.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-sm">
                        © 2024 VolunteerConnect. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-blue-600 transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
