

'use client';
import { useUser } from '@/app/provider';
import Image from 'next/image';

function WelcomeContainer() {
    const { user } = useUser();

    return (
        <div className="flex items-center  justify-between bg-gradient-to-r from-gray-50 to-white p-8 rounded-md   border border-gray-200 w-full mx-auto">
            {/* Avatar */}
            <div className="flex-shrink-0">
                {user?.picture ? (
                    <Image
                        src={user.picture}
                        alt="User Avatar"
                        width={50}
                        height={50}
                        className="rounded-full border border-gray-300 object-cover"
                    />
                ) : (
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 text-gray-600 text-lg font-semibold rounded-full">
                        {user?.name?.[0]?.toUpperCase() || '?'}
                    </div>
                )}
            </div>

            {/* Welcome Text */}
            <div className="flex-1   ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Welcome Back,{' '}
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                        {user?.name || 'Guest'}
                    </span>
                </h2>
                <p className="text-sm text-gray-600 font-medium">
                    AI-driven interview prep tailored for you.
                </p>
            </div>

            {/* Call to Action */}
            <div className="flex-shrink-0 ml-4">
                <button className="px-4 py-2 bg-primary cursor-pointer text-white text-sm font-medium rounded-md   transition duration-300">
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default WelcomeContainer;
