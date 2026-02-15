import { useState, useRef, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        role: 'volunteer',
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef(null);
    const { login, register } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const validateEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const validatePassword = (password) => {
        // Min 8 chars, 1 uppercase, 1 number
        return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
    };

    const validatePhone = (phone) => {
        // Simple verification for now, can be improved
        return /^\d{10}$/.test(phone.replace(/\D/g, ''));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Real-time validation
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (activeTab === 'signup' && !validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters, with 1 uppercase and 1 number';
        }

        if (activeTab === 'signup') {
            if (!formData.name) newErrors.name = 'Full Name is required';
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
            if (formData.phone && !validatePhone(formData.phone)) {
                newErrors.phone = 'Invalid phone number';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            if (activeTab === 'login') {
                await login(formData.email, formData.password);
            } else {
                await register(formData);
            }
            onClose();
            // Show success toast (handled by parent or global toast context)
        } catch (error) {
            console.error("Auth error:", error);
            setErrors({ form: error.response?.data?.message || 'Authentication failed' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div
                ref={modalRef}
                className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all"
            >
                {/* Header / Tabs */}
                <div className="flex border-b border-gray-100 relative">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
                    >
                        <X size={20} />
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === 'login'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`flex-1 py-4 text-center font-semibold transition-colors ${activeTab === 'signup'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => setActiveTab('signup')}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {errors.form && (
                            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                                <AlertCircle size={16} />
                                {errors.form}
                            </div>
                        )}

                        {activeTab === 'signup' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-200'
                                            }`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-200'
                                        }`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {activeTab === 'signup' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-200'
                                            }`}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-10 pr-10 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.password ? 'border-red-300 focus:ring-red-200' : 'border-gray-200'
                                        }`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        {activeTab === 'signup' && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.confirmPassword ? 'border-red-300 focus:ring-red-200' : 'border-gray-200'
                                            }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>
                        )}

                        {activeTab === 'login' && (
                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    Remember me
                                </label>
                                <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                            </div>
                        )}

                        {activeTab === 'signup' && (
                            <div className="grid grid-cols-2 gap-3 mb-2">
                                <label className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center gap-2 transition-all ${formData.role === 'volunteer' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="volunteer"
                                        checked={formData.role === 'volunteer'}
                                        onChange={handleInputChange}
                                        className="hidden"
                                    />
                                    <User size={24} />
                                    <span className="text-sm font-medium">I'm a Volunteer</span>
                                </label>
                                <label className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center gap-2 transition-all ${formData.role === 'ngo_admin' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:bg-gray-50'
                                    }`}>
                                    <input
                                        type="radio"
                                        name="role"
                                        value="ngo_admin"
                                        checked={formData.role === 'ngo_admin'}
                                        onChange={handleInputChange}
                                        className="hidden"
                                    />
                                    <div className="relative">
                                        <User size={24} />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                                    </div>
                                    <span className="text-sm font-medium">I'm an NGO</span>
                                </label>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                activeTab === 'login' ? 'Login' : 'Create Account'
                            )}
                        </button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-500">or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-full transition-all flex items-center justify-center gap-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </button>

                        <p className="text-center text-sm text-gray-600 mt-6">
                            {activeTab === 'login' ? (
                                <>
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('signup')}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        Sign up
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('login')}
                                        className="text-blue-600 font-medium hover:underline"
                                    >
                                        Login
                                    </button>
                                </>
                            )}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
