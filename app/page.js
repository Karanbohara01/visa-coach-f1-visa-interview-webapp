

// 'use client'
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { BarChart, BookOpen, Bot, Globe, Languages, Mic } from "lucide-react";
// import Link from "next/link";
// import Logo from "./auth/Logo";

// export default function Home() {
//   return (
//     <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
//       {/* Animated Background Elements */}
//       <motion.div
//         className="fixed top-0 left-0 w-full h-full pointer-events-none"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.2 }}
//         transition={{ duration: 2 }}
//       >
//         <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
//         <div className="absolute top-1/4 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
//         <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
//       </motion.div>

//       {/* Header */}
//       <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 z-50">
//         <div className="container mx-auto px-6 py-4 flex justify-between items-center">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//           >


//             <Logo />
//           </motion.div>
//           <nav className="hidden md:flex items-center space-x-6">
//             {['Features', 'Pricing', 'Resources', 'Testimonials'].map((item, index) => (
//               <motion.a
//                 key={item}
//                 href={`#${item.toLowerCase()}`}
//                 className="text-gray-600 hover:text-purple-600 transition-colors"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3, delay: 0.1 * index }}
//               >
//                 {item}
//               </motion.a>
//             ))}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.5 }}
//             >
//               <Link href='/auth/login'>
//                 <Button className="ml-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
//                   Get Started
//                 </Button>
//               </Link>
//             </motion.div>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="flex-grow pt-32">
//         <section className="relative py-20 overflow-hidden">
//           <div className="container mx-auto px-6 max-w-6xl">
//             <div className="flex flex-col lg:flex-row items-center">
//               <motion.div
//                 className="lg:w-1/2 mb-16 lg:mb-0"
//                 initial={{ opacity: 0, x: -50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}
//                 >
//                   <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
//                     AI-Powered Visa Assistant
//                   </span>
//                 </motion.div>
//                 <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
//                   <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Ace Your Visa</span><br />
//                   Interview with AI
//                 </h1>
//                 <p className="text-xl text-gray-600 mb-10">
//                   Our advanced AI analyzes your responses and provides real-time feedback to help you succeed in your visa interview.
//                 </p>
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <motion.div
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <Button className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
//                       Start Free Trial
//                     </Button>
//                   </motion.div>
//                   <motion.div
//                     whileHover={{ scale: 1.03 }}
//                     whileTap={{ scale: 0.98 }}
//                   >
//                     <Button variant="outline" className="px-8 py-4 text-lg border-gray-300 hover:border-purple-400 rounded-xl transition-colors flex items-center">
//                       <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
//                       </svg>
//                       Watch Demo
//                     </Button>
//                   </motion.div>
//                 </div>
//                 <div className="mt-8 flex items-center">
//                   <div className="flex -space-x-2">
//                     {[1, 2, 3, 4].map((item) => (
//                       <img
//                         key={item}
//                         src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}.jpg`}
//                         className="w-10 h-10 rounded-full border-2 border-white"
//                         alt="User"
//                       />
//                     ))}
//                   </div>
//                   <div className="ml-4">
//                     <div className="flex items-center">
//                       <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                       </svg>
//                       <p className="ml-1 text-sm font-medium text-gray-900">
//                         4.9 <span className="font-normal text-gray-500">(2.1k reviews)</span>
//                       </p>
//                     </div>
//                     <p className="text-sm text-gray-500">Trusted by 10,000+ applicants</p>
//                   </div>
//                 </div>
//               </motion.div>
//               <motion.div
//                 className="lg:w-1/2 relative"
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8 }}
//               >
//                 <div className="relative">
//                   {/* Animated background blobs */}
//                   <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
//                   <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

//                   {/* Interview simulation container */}
//                   <div className="relative rounded-md overflow-hidden border border-gray-200   bg-white">
//                     {/* Interview header */}
//                     <div className="bg-purple-500 p-4 text-white">
//                       <h3 className="text-center font-medium">AI-Powered Visa Interview Simulation</h3>
//                     </div>

//                     {/* Participants */}
//                     <div className="grid grid-cols-2 divide-x divide-gray-200">
//                       {/* Visa Officer - Left Side */}
//                       <div className="p-6">
//                         <div className="flex flex-col items-center mb-4">
//                           <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-3 border-4 border-white shadow-md">
//                             <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                           <h4 className="font-semibold text-gray-900">Visa Officer</h4>
//                           <p className="text-sm text-gray-500">U.S. Consulate</p>
//                           <div className="mt-2 flex items-center">
//                             <span className="relative flex h-3 w-3 mr-1">
//                               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//                               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//                             </span>
//                             <span className="text-xs text-gray-500">Active</span>
//                           </div>
//                         </div>

//                         {/* Officer's speech bubble */}
//                         <div className="bg-gray-100 p-4 rounded-lg relative">
//                           <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-gray-100"></div>
//                           <p className="text-gray-800">What will you study in the United States?</p>
//                           <div className="mt-2 flex justify-end">
//                             <span className="text-xs text-gray-500">00:45</span>
//                           </div>
//                         </div>

//                         {/* AI analysis for officer */}
//                         <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
//                           <div className="flex items-start">
//                             <svg className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
//                               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                             </svg>
//                             <p className="ml-2 text-xs text-blue-700">AI is analyzing tone and phrasing for optimal questioning</p>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Applicant - Right Side */}
//                       <div className="p-6 bg-gray-50">
//                         <div className="flex flex-col items-center mb-4">
//                           <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3 border-4 border-white shadow-md">
//                             <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                           <h4 className="font-semibold text-gray-900">Applicant</h4>
//                           <p className="text-sm text-gray-500">Student Visa</p>
//                           <div className="mt-2">
//                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
//                               Practicing
//                             </span>
//                           </div>
//                         </div>

//                         {/* Applicant's speech bubble */}
//                         <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-lg text-white relative">
//                           <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-blue-500"></div>
//                           <p>I'll be pursuing a Master's in Computer Science at Stanford University.</p>
//                           <div className="mt-2 flex justify-end">
//                             <span className="text-xs text-white/70">00:52</span>
//                           </div>
//                         </div>

//                         {/* AI feedback for applicant */}
//                         <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
//                           <div className="flex items-start">
//                             <svg className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
//                               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                             </svg>
//                             <div className="ml-2">
//                               <p className="text-xs font-medium text-yellow-700">AI Feedback:</p>
//                               <p className="text-xs text-yellow-700">Good answer! Consider adding your specialization area and future career goals.</p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Controls */}
//                     <div className="border-t border-gray-200 p-4 bg-gray-100">
//                       <div className="flex items-center justify-center space-x-4">
//                         <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition">
//                           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//                           </svg>
//                         </button>
//                         <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition">
//                           <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
//                           </svg>
//                         </button>
//                         <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:shadow-md transition flex items-center shadow-lg">
//                           <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           Start New Practice
//                         </button>
//                       </div>
//                       <div className="mt-4 flex justify-center">
//                         <div className="w-full max-w-md bg-gray-200 rounded-full h-1.5">
//                           <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full w-2/3"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Logo Cloud */}
//         <section className="py-16 bg-gray-50">
//           <div className="container mx-auto px-6">
//             <p className="text-center text-gray-500 mb-10">Trusted by applicants from leading institutions</p>
//             <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
//               {['Harvard', 'Stanford', 'MIT', 'Oxford', 'ETH Zurich', 'University of Tokyo'].map((logo) => (
//                 <motion.div
//                   key={logo}
//                   className="text-2xl font-bold text-gray-700 opacity-70 hover:opacity-100 transition-opacity"
//                   whileHover={{ scale: 1.1 }}
//                 >
//                   {logo}
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section id="features" className="py-20">
//           <div className="container mx-auto px-6">
//             <motion.div
//               className="text-center mb-20"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
//                 Why Choose Us
//               </span>
//               <h2 className="text-4xl font-bold text-gray-900 mb-4">Prepare with confidence</h2>
//               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                 Our platform combines AI technology with visa expertise to give you the best preparation.
//               </p>
//             </motion.div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[
//                 {
//                   icon: <Mic className="w-8 h-8 text-purple-600" />,
//                   title: "Realistic Mock Interviews",
//                   description: "Practice with AI that adapts to your responses, simulating actual visa officers."
//                 },
//                 {
//                   icon: <BarChart className="w-8 h-8 text-blue-600" />,
//                   title: "Performance Analytics",
//                   description: "Get detailed reports on your strengths and areas needing improvement."
//                 },
//                 {
//                   icon: <BookOpen className="w-8 h-8 text-pink-600" />,
//                   title: "Document Guidance",
//                   description: "AI-powered checklist to ensure you have all required documents."
//                 },
//                 {
//                   icon: <Globe className="w-8 h-8 text-indigo-600" />,
//                   title: "Country-Specific Advice",
//                   description: "Tailored guidance based on your destination country's requirements."
//                 },
//                 {
//                   icon: <Languages className="w-8 h-8 text-green-600" />,
//                   title: "Multilingual Support",
//                   description: "Practice in your native language or English for better preparation."
//                 },
//                 {
//                   icon: <Bot className="w-8 h-8 text-purple-600" />,
//                   title: "24/7 AI Coach",
//                   description: "Get instant feedback anytime, anywhere with our AI assistant."
//                 }
//               ].map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-xl transition-all"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   whileHover={{ y: -5 }}
//                 >
//                   <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center mb-6">
//                     {feature.icon}
//                   </div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Testimonial Section */}
//         <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
//           <div className="container mx-auto px-6 max-w-5xl">
//             <motion.div
//               className="text-center mb-16"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
//                 Success Stories
//               </span>
//               <h2 className="text-4xl font-bold text-gray-900 mb-4">What our users say</h2>
//               <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//                 Hear from applicants who aced their interviews with Visa Coach.
//               </p>
//             </motion.div>
//             <motion.div
//               className="grid grid-cols-1 md:grid-cols-2 gap-8"
//               initial={{ opacity: 0 }}
//               whileInView={{ opacity: 1 }}
//               transition={{ duration: 0.5, staggerChildren: 0.2 }}
//               viewport={{ once: true, margin: "0px 0px -100px 0px" }}
//             >
//               {[
//                 {
//                   name: "Sarah Johnson",
//                   role: "F-1 Visa Applicant",
//                   content: "Visa Coach's mock interviews prepared me so well that my actual visa interview felt like just another practice session. I got approved on the first try!",
//                   rating: 5,
//                   image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
//                   flag: "US",
//                   university: "Stanford University"
//                 },
//                 {
//                   name: "Raj Patel",
//                   role: "H-1B Visa Applicant",
//                   content: "The AI feedback was incredibly detailed and helped me refine my answers. The consular officer even complimented how well-prepared I was!",
//                   rating: 5,
//                   image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
//                   flag: "NP",
//                   university: "Google Inc."
//                 }
//               ].map((testimonial, index) => (
//                 <motion.div
//                   key={index}
//                   className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
//                   initial={{ opacity: 0, y: 50 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   whileHover={{ y: -5 }}
//                   transition={{
//                     duration: 0.5,
//                     delay: index * 0.2,
//                     type: "spring",
//                     stiffness: 100
//                   }}
//                   viewport={{ once: true }}
//                 >
//                   <div className="flex items-start mb-6">
//                     <div className="relative">
//                       <img
//                         src={testimonial.image}
//                         alt={testimonial.name}
//                         className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
//                       />
//                       <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm text-xl">
//                         {testimonial.flag}
//                       </span>
//                     </div>
//                     <div className="ml-4 flex-1">
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
//                           <p className="text-gray-600 text-sm">{testimonial.role}</p>
//                         </div>
//                         <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
//                           <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                           </svg>
//                           <span className="text-xs font-medium text-blue-600">Verified</span>
//                         </div>
//                       </div>
//                       <div className="flex mt-2">
//                         {[...Array(testimonial.rating)].map((_, i) => (
//                           <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
//                             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
//                           </svg>
//                         ))}
//                       </div>
//                       <div className="mt-2">
//                         <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
//                           {testimonial.university}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <blockquote className="text-gray-700 relative pl-4">
//                     <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full"></div>
//                     "{testimonial.content}"
//                   </blockquote>
//                   <div className="mt-4 flex justify-end">
//                     <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
//                     </svg>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
//           <div className="container mx-auto px-6 text-center">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               viewport={{ once: true }}
//             >
//               <h2 className="text-4xl font-bold mb-6">Ready to ace your visa interview?</h2>
//               <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
//                 Join thousands of successful applicants who prepared with Visa Coach.
//               </p>
//               <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >


//                   <Button variant="outline" className="px-8 py-4 text-lg border-white text-purple-600 hover:bg-white/10 rounded-xl transition-colors">
//                     Start 7-Day Free Trial
//                   </Button>
//                 </motion.div>
//                 <motion.div
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <Button variant="outline" className="px-8 py-4 text-lg border-white text-purple-600 hover:bg-white/10 rounded-xl transition-colors">
//                     Schedule Demo
//                   </Button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 py-16">
//         <div className="container mx-auto px-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
//             <div>
//               <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
//                 <span className="mr-2">✨</span>Visa Coach
//               </h4>
//               <p className="mb-4">
//                 AI-powered visa interview preparation for applicants worldwide.
//               </p>
//               <div className="flex space-x-4">
//                 {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
//                   <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
//                     <span className="sr-only">{social}</span>
//                     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
//                     </svg>
//                   </a>
//                 ))}
//               </div>
//             </div>
//             <div>
//               <h5 className="text-sm font-semibold text-white uppercase mb-4">Product</h5>
//               <ul className="space-y-2">
//                 {['Features', 'Pricing', 'API', 'Integrations'].map((item) => (
//                   <li key={item}>
//                     <a href="#" className="hover:text-white transition-colors">{item}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h5 className="text-sm font-semibold text-white uppercase mb-4">Company</h5>
//               <ul className="space-y-2">
//                 {['About', 'Blog', 'Careers', 'Press'].map((item) => (
//                   <li key={item}>
//                     <a href="#" className="hover:text-white transition-colors">{item}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h5 className="text-sm font-semibold text-white uppercase mb-4">Legal</h5>
//               <ul className="space-y-2">
//                 {['Privacy', 'Terms', 'Cookie Policy', 'Contact'].map((item) => (
//                   <li key={item}>
//                     <a href="#" className="hover:text-white transition-colors">{item}</a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-500 text-sm mb-4 md:mb-0">
//               © 2025 Visa Coach. All rights reserved.
//             </p>
//             <div className="flex space-x-6">
//               <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
//                 Privacy Policy
//               </a>
//               <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
//                 Terms of Service
//               </a>
//               <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
//                 Cookies
//               </a>
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

'use client'
import React, { useState } from 'react';
import { motion } from "framer-motion";
import {
  BarChart,
  BookOpen,
  Bot,
  Globe,
  Languages,
  Mic,
  CheckCircle,
  AlertCircle,
  X,
  Menu,
  Play,
  Star,
  Users,
  Award,
  Clock,
  Shield,
  ArrowRight
} from "lucide-react";
import Link from 'next/link';

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50 focus:ring-purple-500"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Alert = ({ type = "info", children, onClose }) => {
  const types = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-purple-50 border-purple-200 text-purple-800"
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <AlertCircle className="w-5 h-5" />
  };

  return (
    <div className={`border rounded-lg p-4 flex items-start space-x-3 ${types[type]}`}>
      {icons[type]}
      <div className="flex-1">{children}</div>
      {onClose && (
        <button onClick={onClose} className="text-current opacity-50 hover:opacity-100">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const ProgressBar = ({ value, max = 100, className = "" }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div
      className="bg-purple-600 h-2 rounded-full transition-all duration-300"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </div>
);

const StatusIndicator = ({ status, children }) => {
  const colors = {
    online: "bg-green-500",
    busy: "bg-yellow-500",
    offline: "bg-red-500"
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${colors[status]}`} />
      <span className="text-sm text-gray-600">{children}</span>
    </div>
  );
};

export default function ProfessionalVisaCoach() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAlert, setShowAlert] = useState(true);
  const [demoProgress, setDemoProgress] = useState(45);

  const navigationItems = [
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Success Stories", href: "#testimonials" },
    { label: "Support", href: "#support" }
  ];

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "AI-Powered Mock Interviews",
      description: "Practice with realistic scenarios tailored to your visa type and destination country.",
      benefits: ["Real-time feedback", "Adaptive questioning", "Performance tracking"]
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: "Detailed Analytics",
      description: "Comprehensive reports showing your progress and areas for improvement.",
      benefits: ["Performance metrics", "Trend analysis", "Personalized recommendations"]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Document Checklist",
      description: "Never miss a required document with our intelligent preparation guide.",
      benefits: ["Country-specific requirements", "Document verification", "Status tracking"]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Specialized preparation for visas to 50+ countries worldwide.",
      benefits: ["Country-specific guidance", "Cultural insights", "Local requirements"]
    },
    {
      icon: <Languages className="w-6 h-6" />,
      title: "Multi-language Support",
      description: "Practice in English or your native language for optimal preparation.",
      benefits: ["15+ languages", "Native speaker feedback", "Cultural adaptation"]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your data is encrypted and protected with enterprise-grade security.",
      benefits: ["End-to-end encryption", "GDPR compliant", "No data sharing"]
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Complete Profile",
      description: "Tell us about your visa type, destination, and background",
      time: "2 minutes"
    },
    {
      number: 2,
      title: "Practice Interview",
      description: "Engage with our AI interviewer in realistic scenarios",
      time: "15-30 minutes"
    },
    {
      number: 3,
      title: "Review Feedback",
      description: "Get detailed analysis and personalized improvement tips",
      time: "5 minutes"
    },
    {
      number: 4,
      title: "Repeat & Improve",
      description: "Continue practicing until you're confident and ready",
      time: "Ongoing"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* System Status Alert - Heuristic 1: Visibility of System Status */}
      {showAlert && (
        <div className="bg-purple-50 border-b border-purple-200 p-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Alert type="info" onClose={() => setShowAlert(false)}>
              <div className="flex items-center justify-between">
                <div>
                  <strong>System Status:</strong> All services operational.
                  <StatusIndicator status="online">99.9% uptime</StatusIndicator>
                </div>
                <div className="text-sm">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </Alert>
          </div>
        </div>
      )}

      {/* Navigation - Heuristic 4: Consistency and Standards */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    <Mic className="w-6 h-6 text-primary" />
                  </span>
                </div>
                <span className=" text-xl font-bold text-primary">Visa Coach</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-gray-600 hover:text-purple-600 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-md"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href={'/auth/login'}><Button variant="secondary">Sign In</Button></Link>
              <Link href={'/auth/login'}><Button variant="primary">Start Free Trial</Button></Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu - Heuristic 6: Recognition rather than recall */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="space-y-3 px-3">
                  <Button variant="secondary" className="w-full">Sign In</Button>
                  <Button variant="primary" className="w-full">Start Free Trial</Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Heuristic 2: Match between system and real world */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Trusted by 50,000+ visa applicants
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Prepare for Your Visa Interview with
                <span className="text-purple-600"> AI-Powered Confidence</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8">
                Join thousands of successful applicants who used our platform to ace their visa interviews.
                Get personalized feedback, practice realistic scenarios, and build the confidence you need.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  variant="primary"
                  className="px-8 py-4 text-lg flex items-center justify-center"
                >
                  Start Free 7-Day Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 text-lg flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo (2 min)
                </Button>
              </div>

              {/* Social Proof - Heuristic 7: Flexibility and efficiency of use */}
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">94%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50K+</div>
                  <div className="text-sm text-gray-600">Users Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Demo - Heuristic 8: Aesthetic and minimalist design */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Live Demo</h3>
                  <StatusIndicator status="online">Active Session</StatusIndicator>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <p className="text-sm text-gray-800">
                          "What is the purpose of your visit to the United States?"
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 justify-end">
                    <div className="flex-1">
                      <div className="bg-purple-600 text-white rounded-lg p-3">
                        <p className="text-sm">
                          "I'm planning to pursue a Master's degree in Computer Science at Stanford University."
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">AI Feedback</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Excellent! Clear and specific answer. Consider adding your planned duration of study.
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Session Progress</span>
                    <span className="text-sm font-medium text-gray-900">{demoProgress}%</span>
                  </div>
                  <ProgressBar value={demoProgress} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Heuristic 3: User control and freedom */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our simple 4-step process. You're in control every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-4 ${step.number <= currentStep ? 'bg-purple-600' : 'bg-gray-300'
                    }`}>
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-2">{step.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {step.time}
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gray-200">
                    <div className={`h-full transition-all duration-500 ${step.number < currentStep ? 'bg-purple-600 w-full' : 'bg-gray-200 w-0'
                      }`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center flex gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => setCurrentStep(Math.max(currentStep - 1, 1))}
            >
              Previous Step
            </Button>
            <Button
              variant="primary"
              onClick={() => setCurrentStep(Math.min(currentStep + 1, 4))}
              className="mr-4"
            >
              Next Step
            </Button>

          </div>
        </div>
      </section>

      {/* Features - Heuristic 5: Error prevention */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Features That Ensure Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform prevents common interview mistakes and guides you to success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Heuristic 9: Help users recognize, diagnose, and recover from errors */}
      <section id="testimonials" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from applicants who overcame challenges and achieved their visa goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Student Visa Applicant",
                university: "MIT",
                country: "USA",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
                quote: "I was initially rejected due to insufficient preparation. Visa Coach helped me identify my weaknesses and practice effectively. Got approved on my second attempt!",
                improvement: "Went from 2/10 confidence to 9/10 confidence"
              },
              {
                name: "Carlos Rodriguez",
                role: "Work Visa Applicant",
                university: "Google",
                country: "Canada",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
                quote: "The AI feedback was incredibly detailed and helped me understand exactly what consular officers look for. The practice sessions made the real interview feel familiar.",
                improvement: "Approved on first attempt after using platform"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-purple-600">{testimonial.university}, {testimonial.country}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">Success Outcome:</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">{testimonial.improvement}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Heuristic 10: Help and documentation */}
      <section className="py-20 bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Visa Journey?</h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful applicants. Start your free trial today with full access to all features.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button variant="secondary" className="px-8 py-4 text-lg">
              Start Free 7-Day Trial
            </Button>
            <Button
              variant="outline"
              className="px-8 py-4 text-lg border-white text-white hover:bg-white hover:text-purple-600"
            >
              Schedule Demo Call
            </Button>
          </div>

          <div className="text-sm text-purple-100">
            <p>✓ No credit card required  ✓ Full access to all features  ✓ Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 text-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8  rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">
                    <Mic className="w-6 h-6" />
                  </span>
                </div>
                <span className="ml-2 text-xl font-bold text-primary">Visa Coach</span>
              </div>
              <p className="text-gray-700">
                AI-powered visa interview preparation for applicants worldwide.
              </p>
            </div>

            <div>
              <h4 className="text-primary font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors text-primary">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-primary">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors text-primary">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-primary font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-primary font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700">© 2025 Visa Coach. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <StatusIndicator status="online">System Status</StatusIndicator>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}