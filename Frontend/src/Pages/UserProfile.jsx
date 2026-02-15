import React from 'react';
import { useAuth } from '../hooks/useAuth';

const UserProfile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-3xl">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full capitalize">
                        {user?.role?.replace('_', ' ')}
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                {/* Form fields would go here */}
                <p className="text-gray-500 italic">Profile editing functionality coming soon...</p>
            </div>
        </div>
    );
};

export default UserProfile;
