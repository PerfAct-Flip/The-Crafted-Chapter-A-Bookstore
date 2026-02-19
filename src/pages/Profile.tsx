import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

interface UserProfile {
    name: string;
    email: string;
    role?: string;
    createdAt?: string;
}

const Profile: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getUserProfile();
                setProfile(res.data);
            } catch (error: any) {
                console.error("Profile fetch error:", error);
                toast.error("Failed to load profile information");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProfile();
        }
    }, [token]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
                <p className="text-xl font-medium">No profile data found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 min-h-[70vh]">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header Section */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700"></div>

                <div className="px-8 pb-12 relative">
                    {/* Avatar */}
                    <div className="absolute -top-16 left-8">
                        <div className="w-32 h-32 rounded-3xl bg-white p-2 shadow-lg">
                            <div className="w-full h-full rounded-2xl bg-gray-100 flex items-center justify-center text-4xl font-bold text-blue-600 border-2 border-blue-50">
                                {profile.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h1 className="text-4xl font-extrabold text-gray-900">{profile.name}</h1>
                            <p className="text-gray-500 font-medium mt-1">Customer Profile</p>
                        </div>

                        <div className="flex gap-3">
                            <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-bold border border-blue-100 uppercase tracking-wider">
                                {profile.role || 'Member'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Full Name</p>
                                <p className="text-lg font-bold text-gray-800">{profile.name}</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Email Address</p>
                                <p className="text-lg font-bold text-gray-800">{profile.email}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-colors">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Account Created</p>
                                <p className="text-lg font-bold text-gray-800">
                                    {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : 'N/A'}
                                </p>
                            </div>

                            <div className="bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-200 flex flex-col justify-center text-white">
                                <p className="font-bold text-lg mb-1">Verified Account</p>
                                <p className="text-blue-100 text-sm opacity-90">Your account is fully secured and verified.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
