
// app\AIInterviewSession.jsx
// app\page.js
'use client'
import React, { useState } from 'react';
import { motion } from "framer-motion";
import LastUpdated from '@/components/LastUpdated';
import AllInterviewSession from './AIInterviewSession';
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
  const [time, setTime] = useState("");

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
                <LastUpdated />
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT */}
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Trusted by 50,000+ visa applicants
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Prepare for Your Visa Interview with
                <span className="text-purple-600"> AI-Powered Confidence</span>
              </h1>



              {/* ✅ Inject AI Session Component */}
              <AllInterviewSession />




            </div>

            {/* RIGHT */}
            <div className="relative">
              <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Live Demo</h3>
                  <StatusIndicator status="online">Active Session</StatusIndicator>
                </div>

                <div className="space-y-4">
                  {/* Question */}
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

                  {/* Response */}
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

                  {/* Feedback */}
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

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Session Progress</span>
                    <span className="text-sm font-medium text-gray-900">{typeof demoProgress !== 'undefined' ? demoProgress : 60}%</span>
                  </div>
                  <ProgressBar value={typeof demoProgress !== 'undefined' ? demoProgress : 60} />
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
                image: "https://english.pardafas.com/wp-content/uploads/2023/09/Rekha-Thapa.jpg",
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