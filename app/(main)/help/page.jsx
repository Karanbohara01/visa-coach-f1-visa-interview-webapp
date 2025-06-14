
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaChevronDown, FaLightbulb, FaRegStar, FaSearch, FaStar } from 'react-icons/fa';
import { IoDocumentTextOutline, IoSpeedometerOutline } from 'react-icons/io5';
import { PiStudentBold } from 'react-icons/pi';
import { RiCustomerService2Fill } from 'react-icons/ri';

// --- Data ---
const faqs = [
    { 
        question: "Is Visa Coach AI free?", 
        answer: "✅ Yes! Our core features are completely free forever. We offer premium upgrades for advanced analytics, personalized coaching sessions, and document review services.",
        stars: 5
    },
    { 
        question: "How accurate is the AI feedback?", 
        answer: "Our AI system is trained on over 50,000 successful F1 visa interviews and continuously updated with the latest consular trends. It provides feedback with 94.7% accuracy based on user-reported outcomes.",
        stars: 4
    },
    { 
        question: "Can I practice specific question types?", 
        answer: "Absolutely! Our question bank lets you focus on specific categories: academic background, financial proof, post-graduation plans, or ties to home country. Create custom practice sessions targeting your weak areas.",
        stars: 5
    }
];

const features = [
    { 
        name: "AI Mock Interview", 
        description: "Experience a hyper-realistic simulation with our AI consular officer that adapts to your responses in real-time.",
        icon: <PiStudentBold className="w-8 h-8" />,
        color: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    { 
        name: "Performance Analytics", 
        description: "Detailed breakdowns of your fluency, confidence, content accuracy, and body language with improvement timelines.",
        icon: <IoDocumentTextOutline className="w-8 h-8" />,
        color: "bg-gradient-to-br from-purple-300 to-purple-500"
    },
    { 
        name: "Document Coach", 
        description: "Smart checklist that evaluates your documents and suggests improvements before submission.",
        icon: <IoSpeedometerOutline className="w-8 h-8" />,
        color: "bg-gradient-to-br from-purple-200 to-purple-400"
    },
    { 
        name: "Visa Success Predictor", 
        description: "Our proprietary algorithm calculates your approval probability based on practice performance.",
        icon: <FaLightbulb className="w-8 h-8" />,
        color: "bg-gradient-to-br from-purple-500 to-purple-700"
    }
];

const testimonials = [
    {
        quote: "Visa Coach AI helped me identify weak points I didn't know I had. Nailed my interview on the first try!",
        author: "Maria K., Stanford University"
    },
    {
        quote: "The document checklist saved me - caught 3 missing items I would have overlooked. Lifesaver!",
        author: "Raj P., University of Texas"
    },
    {
        quote: "Practicing with the AI gave me so much confidence. The real interview felt easier than the mock!",
        author: "Linh T., NYU"
    }
];

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { 
            staggerChildren: 0.1, 
            delayChildren: 0.3,
            type: "spring",
            stiffness: 100
        }
    }
};

const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
        y: 0, 
        opacity: 1, 
        transition: { 
            type: 'spring', 
            stiffness: 100,
            damping: 10
        } 
    }
};

const starVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, rotate: 10 },
    tap: { scale: 0.9 }
};

export default function HelpPage() {
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [isHoveringSearch, setIsHoveringSearch] = useState(false);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderStars = (count) => {
        return Array(5).fill(0).map((_, i) => (
            <motion.span 
                key={i}
                variants={starVariants}
                whileHover="hover"
                whileTap="tap"
                className={i < count ? "text-yellow-400" : "text-gray-300"}
            >
                {i < count ? <FaStar /> : <FaRegStar />}
            </motion.span>
        ));
    };

    return (
        <div className="relative min-h-screen rounded-md w-full bg-gradient-to-b from-purple-50 to-white text-purple-900 overflow-hidden">
            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {Array(20).fill(0).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-purple-200/30"
                        initial={{
                            x: Math.random() * 100,
                            y: Math.random() * 100,
                            width: Math.random() * 15 + 5,
                            height: Math.random() * 15 + 5,
                            opacity: Math.random() * 0.3 + 0.1
                        }}
                        animate={{
                            y: [null, Math.random() * 100],
                            x: [null, Math.random() * 100],
                            transition: {
                                duration: Math.random() * 15 + 15,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "linear"
                            }
                        }}
                    />
                ))}
            </div>

            <main className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:py-24">
                {/* --- Header --- */}
                <motion.header
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
                >
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur-lg opacity-75" />
                            <div className="relative bg-white px-6 py-3 rounded-full border border-purple-200 text-sm font-medium text-purple-700 shadow-sm">
                                F1 Visa Success Starts Here
                            </div>
                        </div>
                    </motion.div>

                    <motion.h1 
                        className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">Visa Coach AI</span> Help Center
                    </motion.h1>
                    
                    <motion.p 
                        className="mt-4 text-xl text-purple-700 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Your comprehensive resource for F1 visa interview mastery
                    </motion.p>
                    
                    <motion.div 
                        className="mt-8 max-w-md mx-auto relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        onHoverStart={() => setIsHoveringSearch(true)}
                        onHoverEnd={() => setIsHoveringSearch(false)}
                    >
                        <motion.div
                            animate={{
                                scale: isHoveringSearch ? 1.02 : 1,
                                boxShadow: isHoveringSearch ? "0 0 20px rgba(168, 85, 247, 0.3)" : "0 0 10px rgba(168, 85, 247, 0.1)"
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full blur-md"
                        />
                        <div className="relative">
                            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-purple-400" />
                            <input
                                type="text"
                                placeholder="How can we help you today?"
                                className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300 placeholder-purple-400 text-purple-800 shadow-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </motion.div>
                </motion.header>

                {/* --- Features Section --- */}
                <motion.section
                    id="features"
                    className="mb-32"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h2 
                        className="text-4xl font-bold text-center mb-6"
                        variants={itemVariants}
                    >
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Premium</span> Features
                    </motion.h2>
                    
                    <motion.p 
                        className="text-center text-purple-700 max-w-2xl mx-auto mb-12"
                        variants={itemVariants}
                    >
                        Designed specifically for F1 visa applicants by immigration experts
                    </motion.p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative group"
                                whileHover={{ y: -10 }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur-md" />
                                <div className="relative h-full bg-white border border-purple-100 rounded-xl p-6 text-center group-hover:border-purple-300 group-hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden shadow-sm">
                                    <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full ${feature.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
                                    <div className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center ${feature.color} text-white text-3xl shadow-lg`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-purple-800">{feature.name}</h3>
                                    <p className="text-purple-600 text-sm">{feature.description}</p>
                                    <div className="mt-4">
                                        <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                                            Popular
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* --- Testimonials Section --- */}
                <motion.section 
                    className="mb-32"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="bg-white border border-purple-100 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-sm">
                        <div className="absolute inset-0 bg-[url('/grid-pattern-light.svg')] opacity-10" />
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-center mb-12">
                                Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Thousands</span> of Students
                            </h2>
                            
                            <div className="max-w-3xl mx-auto h-48 relative">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTestimonial}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 flex flex-col items-center justify-center text-center"
                                    >
                                        <blockquote className="text-xl italic mb-4 text-purple-800">
                                            "{testimonials[activeTestimonial].quote}"
                                        </blockquote>
                                        <p className="text-purple-600">
                                            — {testimonials[activeTestimonial].author}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                            
                            <div className="flex justify-center gap-2 mt-8">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveTestimonial(index)}
                                        className={`w-3 h-3 rounded-full transition-all ${activeTestimonial === index ? 'bg-purple-500 w-6' : 'bg-purple-200'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* --- FAQs Section --- */}
                <motion.section
                    id="faqs"
                    className="mb-32"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className="text-center mb-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.h2 
                            className="text-4xl font-bold mb-4"
                            variants={itemVariants}
                        >
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">Questions</span>
                        </motion.h2>
                        <motion.p 
                            className="text-purple-700 max-w-2xl mx-auto"
                            variants={itemVariants}
                        >
                            Everything you need to know about Visa Coach AI
                        </motion.p>
                    </motion.div>
                    
                    <div className="max-w-3xl mx-auto space-y-4">
                        {filteredFaqs.map((faq, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border border-purple-100 rounded-xl overflow-hidden hover:border-purple-300 transition-colors duration-300 shadow-sm"
                            >
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                    className="w-full flex justify-between items-center p-6 text-left"
                                >
                                    <div>
                                        <h3 className="font-semibold text-lg text-purple-800">{faq.question}</h3>
                                        <div className="flex gap-1 mt-2">
                                            {renderStars(faq.stars)}
                                        </div>
                                    </div>
                                    <motion.div 
                                        animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                                        className="text-purple-400"
                                    >
                                        <FaChevronDown />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {expandedFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-purple-700 border-t border-purple-100 pt-4">
                                                {faq.answer}
                                                <div className="mt-4 flex gap-2">
                                                    <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                                                        Helpful
                                                    </span>
                                                    <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
                                                        Popular
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* --- Contact / CTA Section --- */}
                <motion.section
                    className="mt-24 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                   <div className="relative rounded-2xl overflow-hidden bg-white border border-purple-100 p-12 shadow-sm">
  <div className="absolute inset-0 bg-[url('/grid-pattern-light.svg')] opacity-5" />
  <div className="relative z-10">
    <motion.div
      whileHover={{ rotate: 15 }}
      className="inline-block mb-6"
    >
      <RiCustomerService2Fill className="text-purple-600 text-5xl mx-auto" />
    </motion.div>
    <h2 className="text-3xl font-bold text-purple-800 mb-4">Still Need Help?</h2>
    <p className="text-purple-600 max-w-xl mx-auto mb-8">
      Our dedicated support team is available 24/7 to ensure your visa preparation journey is smooth and successful.
    </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <motion.button
        className="bg-purple-600 text-white font-bold px-8 py-3 rounded-full shadow-lg flex items-center gap-2 mx-auto"
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0px 0px 20px rgba(139, 92, 246, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Contact Support</span>
      </motion.button>
      <motion.button
        className="bg-white border-2 border-purple-600 text-purple-600 font-bold px-8 py-3 rounded-full flex items-center gap-2 mx-auto"
        whileHover={{ 
          scale: 1.05,
          backgroundColor: "rgba(139, 92, 246, 0.05)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <span>Schedule a Call</span>
      </motion.button>
    </div>
  </div>
</div>
                </motion.section>
            </main>
        </div>
    );
}