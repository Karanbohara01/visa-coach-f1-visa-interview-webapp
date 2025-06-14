

'use client'
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BarChart, BookOpen, Bot, Globe, Languages, Mic } from "lucide-react";
import Link from "next/link";
import Logo from "./auth/Logo";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/4 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </motion.div>

      {/* Header */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 fixed top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
           

            <Logo/>
          </motion.div>
          <nav className="hidden md:flex items-center space-x-6">
            {['Features', 'Pricing', 'Resources', 'Testimonials'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-purple-600 transition-colors"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {item}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
             <Link href = '/dashboard'>
              <Button className="ml-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Started
              </Button>
             </Link>
            </motion.div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow pt-32">
        <section className="relative py-20 overflow-hidden">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center">
              <motion.div 
                className="lg:w-1/2 mb-16 lg:mb-0"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
                    AI-Powered Visa Assistant
                  </span>
                </motion.div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Ace Your Visa</span><br />
                  Interview with AI
                </h1>
                <p className="text-xl text-gray-600 mb-10">
                  Our advanced AI analyzes your responses and provides real-time feedback to help you succeed in your visa interview.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button className="px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all">
                      Start Free Trial
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button variant="outline" className="px-8 py-4 text-lg border-gray-300 hover:border-purple-400 rounded-xl transition-colors flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path>
                      </svg>
                      Watch Demo
                    </Button>
                  </motion.div>
                </div>
                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((item) => (
                      <img 
                        key={item}
                        src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item}.jpg`}
                        className="w-10 h-10 rounded-full border-2 border-white"
                        alt="User"
                      />
                    ))}
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                      <p className="ml-1 text-sm font-medium text-gray-900">
                        4.9 <span className="font-normal text-gray-500">(2.1k reviews)</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">Trusted by 10,000+ applicants</p>
                  </div>
                </div>
              </motion.div>
             <motion.div 
  className="lg:w-1/2 relative"
  initial={{ opacity: 0, x: 50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>
  <div className="relative">
    {/* Animated background blobs */}
    <div className="absolute -top-10 -left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    
    {/* Interview simulation container */}
    <div className="relative rounded-md overflow-hidden border border-gray-200   bg-white">
      {/* Interview header */}
      <div className="bg-purple-500 p-4 text-white">
        <h3 className="text-center font-medium">AI-Powered Visa Interview Simulation</h3>
      </div>
      
      {/* Participants */}
      <div className="grid grid-cols-2 divide-x divide-gray-200">
        {/* Visa Officer - Left Side */}
        <div className="p-6">
          <div className="flex flex-col items-center mb-4">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-3 border-4 border-white shadow-md">
              <svg className="w-10 h-10 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Visa Officer</h4>
            <p className="text-sm text-gray-500">U.S. Consulate</p>
            <div className="mt-2 flex items-center">
              <span className="relative flex h-3 w-3 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-xs text-gray-500">Active</span>
            </div>
          </div>
          
          {/* Officer's speech bubble */}
          <div className="bg-gray-100 p-4 rounded-lg relative">
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-r-4 border-r-gray-100"></div>
            <p className="text-gray-800">What will you study in the United States?</p>
            <div className="mt-2 flex justify-end">
              <span className="text-xs text-gray-500">00:45</span>
            </div>
          </div>
          
          {/* AI analysis for officer */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <svg className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p className="ml-2 text-xs text-blue-700">AI is analyzing tone and phrasing for optimal questioning</p>
            </div>
          </div>
        </div>
        
        {/* Applicant - Right Side */}
        <div className="p-6 bg-gray-50">
          <div className="flex flex-col items-center mb-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-3 border-4 border-white shadow-md">
              <svg className="w-10 h-10 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="font-semibold text-gray-900">Applicant</h4>
            <p className="text-sm text-gray-500">Student Visa</p>
            <div className="mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Practicing
              </span>
            </div>
          </div>
          
          {/* Applicant's speech bubble */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-lg text-white relative">
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-blue-500"></div>
            <p>I'll be pursuing a Master's in Computer Science at Stanford University.</p>
            <div className="mt-2 flex justify-end">
              <span className="text-xs text-white/70">00:52</span>
            </div>
          </div>
          
          {/* AI feedback for applicant */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="flex items-start">
              <svg className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="ml-2">
                <p className="text-xs font-medium text-yellow-700">AI Feedback:</p>
                <p className="text-xs text-yellow-700">Good answer! Consider adding your specialization area and future career goals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Controls */}
      <div className="border-t border-gray-200 p-4 bg-gray-100">
        <div className="flex items-center justify-center space-x-4">
          <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
          <button className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728" />
            </svg>
          </button>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:shadow-md transition flex items-center shadow-lg">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start New Practice
          </button>
        </div>
        <div className="mt-4 flex justify-center">
          <div className="w-full max-w-md bg-gray-200 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-1.5 rounded-full w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</motion.div>
            </div>
          </div>
        </section>

        {/* Logo Cloud */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <p className="text-center text-gray-500 mb-10">Trusted by applicants from leading institutions</p>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-8">
              {['Harvard', 'Stanford', 'MIT', 'Oxford', 'ETH Zurich', 'University of Tokyo'].map((logo) => (
                <motion.div 
                  key={logo}
                  className="text-2xl font-bold text-gray-700 opacity-70 hover:opacity-100 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                >
                  {logo}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Prepare with confidence</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform combines AI technology with visa expertise to give you the best preparation.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Mic className="w-8 h-8 text-purple-600" />,
                  title: "Realistic Mock Interviews",
                  description: "Practice with AI that adapts to your responses, simulating actual visa officers."
                },
                {
                  icon: <BarChart className="w-8 h-8 text-blue-600" />,
                  title: "Performance Analytics",
                  description: "Get detailed reports on your strengths and areas needing improvement."
                },
                {
                  icon: <BookOpen className="w-8 h-8 text-pink-600" />,
                  title: "Document Guidance",
                  description: "AI-powered checklist to ensure you have all required documents."
                },
                {
                  icon: <Globe className="w-8 h-8 text-indigo-600" />,
                  title: "Country-Specific Advice",
                  description: "Tailored guidance based on your destination country's requirements."
                },
                {
                  icon: <Languages className="w-8 h-8 text-green-600" />,
                  title: "Multilingual Support",
                  description: "Practice in your native language or English for better preparation."
                },
                {
                  icon: <Bot className="w-8 h-8 text-purple-600" />,
                  title: "24/7 AI Coach",
                  description: "Get instant feedback anytime, anywhere with our AI assistant."
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-8 rounded-xl border border-gray-100 hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-full text-sm font-medium mb-4">
                Success Stories
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">What our users say</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear from applicants who aced their interviews with Visa Coach.
              </p>
            </motion.div>
            <motion.div 
  className="grid grid-cols-1 md:grid-cols-2 gap-8"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  transition={{ duration: 0.5, staggerChildren: 0.2 }}
  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
>
  {[
    {
      name: "Sarah Johnson",
      role: "F-1 Visa Applicant",
      content: "Visa Coach's mock interviews prepared me so well that my actual visa interview felt like just another practice session. I got approved on the first try!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      flag: "US",
      university: "Stanford University"
    },
    {
      name: "Raj Patel",
      role: "H-1B Visa Applicant",
      content: "The AI feedback was incredibly detailed and helped me refine my answers. The consular officer even complimented how well-prepared I was!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      flag: "NP",
      university: "Google Inc."
    }
  ].map((testimonial, index) => (
    <motion.div 
      key={index}
      className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.2,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
    >
      <div className="flex items-start mb-6">
        <div className="relative">
          <img 
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
          />
          <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm text-xl">
            {testimonial.flag}
          </span>
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
              <p className="text-gray-600 text-sm">{testimonial.role}</p>
            </div>
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
              <svg className="w-4 h-4 text-blue-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-medium text-blue-600">Verified</span>
            </div>
          </div>
          <div className="flex mt-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
              {testimonial.university}
            </span>
          </div>
        </div>
      </div>
      <blockquote className="text-gray-700 relative pl-4">
        <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full"></div>
        "{testimonial.content}"
      </blockquote>
      <div className="mt-4 flex justify-end">
        <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>
    </motion.div>
  ))}
</motion.div>
          
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">Ready to ace your visa interview?</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of successful applicants who prepared with Visa Coach.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                 

                   <Button variant="outline" className="px-8 py-4 text-lg border-white text-purple-600 hover:bg-white/10 rounded-xl transition-colors">
                    Start 7-Day Free Trial
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" className="px-8 py-4 text-lg border-white text-purple-600 hover:bg-white/10 rounded-xl transition-colors">
                    Schedule Demo
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                <span className="mr-2">✨</span>Visa Coach
              </h4>
              <p className="mb-4">
                AI-powered visa interview preparation for applicants worldwide.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'linkedin', 'facebook', 'instagram'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white uppercase mb-4">Product</h5>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'API', 'Integrations'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white uppercase mb-4">Company</h5>
              <ul className="space-y-2">
                {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-white uppercase mb-4">Legal</h5>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Cookie Policy', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Visa Coach. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}