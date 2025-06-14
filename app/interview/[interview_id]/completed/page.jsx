

import { ArrowRight, LayoutDashboard } from 'lucide-react';

const InterviewComplete = () => {
    return (
        <div className="flex items-center justify-center      m-10 mb-10">
            <div className="bg-white  border border-gray-100 rounded-md overflow-hidden w-full mb-10 max-w-2xl">
                {/* Header */}
                <div className="bg-primary p-8 flex flex-col items-center space-y-4">
                    {/* Success Icon */}
                    <div className="rounded-full bg-green-500 p-4 shadow-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-14 w-14 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center">
                        Interview Complete!
                    </h1>
                </div>

                {/* Main Content */}
                <div className="p-8 space-y-6">
                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed">
                        Thank you for participating in the AI-driven interview with <span className="text-blue-500 font-medium">VisaCoach</span>.
                    </p>

                    {/* Image */}
                    <div className="rounded-lg overflow-hidden ">
                        <img
                            src="https://www.svgrepo.com/show/492819/online-interview-female.svg"
                            alt="Interview Illustration"
                            className="w-full object-fit"
                            style={{ maxHeight: "300px" }}
                        />
                    </div>

                    {/* Next Steps */}
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-300 space-y-4">
                        <h2 className="text-2xl font-semibold text-center text-gray-700">
                            What’s Next?
                        </h2>
                        <p className="text-center text-gray-600 leading-relaxed">
                            Your responses are under review. The recruiter will contact you within the next 2–3 business days regarding the next steps.
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-primary text-white rounded-lg py-3 px-6 flex items-center justify-center  cursor-pointer transition duration-300">
                            <LayoutDashboard className="h-5 w-5 mr-2" />
                            Return to Dashboard
                        </button>
                        <button className="bg-gray-200 text-gray-700   rounded-lg py-3 px-6 flex items-center justify-center  cursor-pointer hover:bg-gray-300 transition duration-300">
                            <ArrowRight className="h-5 w-5 mr-2" />
                            View Other Opportunities
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-gray-100 text-gray-500 text-center py-4">
                    <p>&copy; 2025 VisaCoach. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default InterviewComplete;
