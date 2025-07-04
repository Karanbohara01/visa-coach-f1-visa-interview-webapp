


'use client';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AssistantFloatingButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/universities'); // Change to your chatbot route
    };

    return (
        <motion.button
            onClick={handleClick}
            title="Ask AI Assistant"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl hover:shadow-2xl flex items-center gap-2 animate-glow border border-white/20 backdrop-blur-sm"
        >
            <MessageCircle className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Ask AI Assistant</span>
        </motion.button>
    );
}
