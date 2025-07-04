

// import { ArrowRight, LayoutDashboard } from 'lucide-react';

// const InterviewComplete = () => {
//     return (
//         <div className="flex items-center justify-center      m-10 mb-10">
//             <div className="bg-white  border border-gray-100 rounded-md overflow-hidden w-full mb-10 max-w-2xl">
//                 {/* Header */}
//                 <div className="bg-primary p-8 flex flex-col items-center space-y-4">
//                     {/* Success Icon */}
//                     <div className="rounded-full bg-green-500 p-4 shadow-lg">
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-14 w-14 text-white"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="M5 13l4 4L19 7"
//                             />
//                         </svg>
//                     </div>
//                     {/* Title */}
//                     <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center">
//                         Interview Complete!
//                     </h1>
//                 </div>

//                 {/* Main Content */}
//                 <div className="p-8 space-y-6">
//                     {/* Subheading */}
//                     <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed">
//                         Thank you for participating in the AI-driven interview with <span className="text-blue-500 font-medium">VisaCoach</span>.
//                     </p>

//                     {/* Image */}
//                     <div className="rounded-lg overflow-hidden ">
//                         <img
//                             src="https://www.svgrepo.com/show/492819/online-interview-female.svg"
//                             alt="Interview Illustration"
//                             className="w-full object-fit"
//                             style={{ maxHeight: "300px" }}
//                         />
//                     </div>

//                     {/* Next Steps */}
//                     <div className="bg-gray-50 rounded-lg p-6 border border-gray-300 space-y-4">
//                         <h2 className="text-2xl font-semibold text-center text-gray-700">
//                             What’s Next?
//                         </h2>
//                         <p className="text-center text-gray-600 leading-relaxed">
//                             Your responses are under review. The recruiter will contact you within the next 2–3 business days regarding the next steps.
//                         </p>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//                         <button className="bg-primary text-white rounded-lg py-3 px-6 flex items-center justify-center  cursor-pointer transition duration-300">
//                             <LayoutDashboard className="h-5 w-5 mr-2" />
//                             Return to Dashboard
//                         </button>
//                         <button className="bg-gray-200 text-gray-700   rounded-lg py-3 px-6 flex items-center justify-center  cursor-pointer hover:bg-gray-300 transition duration-300">
//                             <ArrowRight className="h-5 w-5 mr-2" />
//                             View Other Opportunities
//                         </button>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <footer className="bg-gray-100 text-gray-500 text-center py-4">
//                     <p>&copy; 2025 VisaCoach. All rights reserved.</p>
//                 </footer>
//             </div>
//         </div>
//     );
// };

// export default InterviewComplete;


'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, LayoutDashboard, PartyPopper } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/provider';


// The component now accepts props for personalization
const InterviewComplete = ({ jobPosition = "Your Interview", userName = "Candidate" }) => {
    const router = useRouter();
    const { user } = useUser();

    // Animation variants for Framer Motion
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
            <motion.div
                className="w-full max-w-3xl text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Animated Success Icon */}
                <motion.div variants={itemVariants} className="flex justify-center">
                    <CheckCircle className="w-24 h-24 text-green-500" strokeWidth={1.5} />
                </motion.div>

                {/* Header Text */}
                <motion.h1
                    variants={itemVariants}
                    className="mt-6 text-4xl md:text-5xl font-extrabold text-gray-800"
                >
                    Interview Complete!
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="mt-4 max-w-xl mx-auto text-lg text-gray-600"
                >
                    Congratulations, {user.name}! You've successfully completed the interview.
                </motion.p>

                {/* Main Content Grid */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 text-left"
                >
                    {/* What's Next Card */}
                    <Card className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PartyPopper className="w-6 h-6 text-primary" />
                                <span>What's Next?</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-gray-600">
                            <p>
                                Our AI is now analyzing your responses to provide a detailed performance report.
                            </p>
                            {/* <p>
                                The hiring team will review your results and will be in touch regarding the next steps within the next **2-3 business days**.
                            </p> */}
                        </CardContent>
                    </Card>

                    {/* Interview Summary Card */}
                    <Card className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <LayoutDashboard className="w-6 h-6 text-primary" />
                                <span>Interview Summary</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-gray-600">
                            <div className="flex justify-between">
                                {/* <span className="font-medium">Position:</span>
                                <span>{jobPosition}</span> */}
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Date Completed:</span>
                                <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Time:</span>
                                <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                >
                    <Link href={'/dashboard'}>
                        <Button size="lg" className="h-12 text-base" onClick={() => router.push('/dashboard')}>
                            <LayoutDashboard className="w-5 h-5 mr-2" />
                            Return to Dashboard
                        </Button>
                    </Link>
                    <Link href={'/scheduled-interview'}>
                        <Button size="lg" variant="outline" className="h-12 text-base" onClick={() => router.push('/opportunities')}>
                            View Detailed Report and feedbacks
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>
                </motion.div>

            </motion.div>
            <footer className="text-center mt-12 text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} VisaCoach. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default InterviewComplete;