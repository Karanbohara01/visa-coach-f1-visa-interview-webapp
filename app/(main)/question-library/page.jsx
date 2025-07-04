// // app/(main)/question-library/page.jsx

// 'use client'

// import { useState } from 'react';
// import { F1_QUESTIONS } from '@/lib/questionData';
// import { Button } from '@/components/ui/button';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
// import { BookMarked } from 'lucide-react';

// export default function QuestionLibraryPage() {
//     const [activeCategory, setActiveCategory] = useState('All');

//     // Get unique categories from the data, including 'All'
//     const categories = ['All', ...new Set(F1_QUESTIONS.map(q => q.category))];

//     // Filter questions based on the active category
//     const filteredQuestions = activeCategory === 'All'
//         ? F1_QUESTIONS
//         : F1_QUESTIONS.filter(q => q.category === activeCategory);

//     return (
//         <div className="p-4 md:p-6">
//             <h1 className="text-xl font-bold flex items-center text-primary gap-2 mb-6">
//                 <BookMarked />
//                 F-1 Interview Question Library
//             </h1>

//             {/* Category Filter Buttons */}
//             <div className="flex flex-wrap gap-2 mb-6">
//                 {categories.map(category => (
//                     <Button
//                         key={category}
//                         variant={activeCategory === category ? 'default' : 'outline'}
//                         onClick={() => setActiveCategory(category)}
//                     >
//                         {category}
//                     </Button>
//                 ))}
//             </div>

//             {/* Questions Accordion */}
//             <div className="space-y-4">
//                 <Accordion type="single" collapsible className="w-full">
//                     {filteredQuestions.map((item, index) => (
//                         <AccordionItem key={item.id} value={`item-${index}`}>
//                             <AccordionTrigger className="text-left hover:no-underline">
//                                 {item.question}
//                             </AccordionTrigger>
//                             <AccordionContent className="text-base text-gray-700 dark:text-gray-300">
//                                 <p className="font-semibold mb-2 text-purple-600">Expert Tip:</p>
//                                 {item.expertTip}
//                             </AccordionContent>
//                         </AccordionItem>
//                     ))}
//                 </Accordion>
//             </div>
//         </div>
//     );
// }

'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { BookMarked, Sparkles, Target, Clock, Users, Globe, Award, Briefcase } from 'lucide-react';
import Link from 'next/link';

// Mock data for demonstration
const F1_QUESTIONS = [
    {
        id: 1,
        question: "Why do you want to study in the United States?",
        category: "Academic Intent",
        expertTip: "Be specific about your academic goals and how US education uniquely serves them. Mention specific programs, professors, or research opportunities that align with your career objectives."
    },
    {
        id: 2,
        question: "How will you finance your education?",
        category: "Financial",
        expertTip: "Provide clear documentation of your funding sources. Be prepared to explain how you calculated your expenses and show evidence of sufficient funds for your entire program duration."
    },
    {
        id: 3,
        question: "What are your plans after graduation?",
        category: "Future Plans",
        expertTip: "Demonstrate strong ties to your home country. Discuss specific career opportunities, family obligations, or business plans that require your return home."
    },
    {
        id: 4,
        question: "Why did you choose this specific university?",
        category: "Academic Intent",
        expertTip: "Research the university thoroughly. Mention specific programs, faculty, research facilities, or unique opportunities that attracted you to this institution over others."
    },
    {
        id: 5,
        question: "What is your intended major and why?",
        category: "Academic Intent",
        expertTip: "Connect your chosen field to your previous academic background, work experience, and future career goals. Show how this major fits into your overall academic and professional trajectory."
    },
    {
        id: 6,
        question: "Do you have any relatives in the United States?",
        category: "Personal Background",
        expertTip: "Answer honestly. If you have relatives, briefly explain their status but emphasize your own independent reasons for studying and your intention to return home."
    },
    {
        id: 7,
        question: "How do you plan to use your degree in your home country?",
        category: "Future Plans",
        expertTip: "Provide specific examples of how your education will benefit your home country. Discuss job opportunities, industries that need your skills, or ways you plan to contribute to development."
    },
    {
        id: 8,
        question: "What are your standardized test scores?",
        category: "Academic Background",
        expertTip: "Be prepared to discuss not just your scores, but also your preparation process and how these scores reflect your academic readiness for US education."
    }
];

const categoryIcons = {
    'Academic Intent': Target,
    'Financial': Briefcase,
    'Future Plans': Award,
    'Personal Background': Users,
    'Academic Background': Globe
};

export default function QuestionLibraryPage() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [hoveredItem, setHoveredItem] = useState(null);

    // Get unique categories from the data, including 'All'
    const categories = ['All', ...new Set(F1_QUESTIONS.map(q => q.category))];

    // Filter questions based on the active category
    const filteredQuestions = activeCategory === 'All'
        ? F1_QUESTIONS
        : F1_QUESTIONS.filter(q => q.category === activeCategory);

    const getCategoryIcon = (category) => {
        const Icon = categoryIcons[category] || Target;
        return Icon;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-primary/10 dark:via-gray-900 dark:to-primary/20">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                <div className="relative p-6 md:p-8 lg:p-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-primary/20 rounded-2xl backdrop-blur-sm">
                                <BookMarked className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-xxl md:text-xxl font-bold text-gray-900 dark:text-white">
                                    F-1 Interview Question Library
                                </h1>
                                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                                    Master your F-1 visa interview with expert guidance
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                                <div className="text-2xl font-bold text-primary">{F1_QUESTIONS.length}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Questions</div>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                                <div className="text-2xl font-bold text-primary">{categories.length - 1}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                                <div className="text-2xl font-bold text-primary">100%</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">Expert Tips</div>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                                <Clock className="h-6 w-6 text-primary mb-1" />
                                <div className="text-sm text-gray-600 dark:text-gray-400">Practice Ready</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-6 md:p-8">
                {/* Enhanced Category Filter */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Filter by Category
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map(category => {
                            const Icon = category === 'All' ? BookMarked : getCategoryIcon(category);
                            return (
                                <Button
                                    key={category}
                                    variant={activeCategory === category ? 'default' : 'outline'}
                                    onClick={() => setActiveCategory(category)}
                                    className={`
                                        transition-all duration-300 hover:scale-105 hover:shadow-lg
                                        ${activeCategory === category
                                            ? 'bg-primary text-white shadow-primary/25 shadow-lg'
                                            : 'border-primary/30 hover:border-primary/50 hover:bg-primary/5'
                                        }
                                    `}
                                >
                                    <Icon className="h-4 w-4 mr-2" />
                                    {category}
                                </Button>
                            );
                        })}
                    </div>
                </div>

                {/* Enhanced Questions Section */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {activeCategory === 'All' ? 'All Questions' : `${activeCategory} Questions`}
                        </h2>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''}
                        </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {filteredQuestions.map((item, index) => {
                            const Icon = getCategoryIcon(item.category);
                            return (
                                <AccordionItem
                                    key={item.id}
                                    value={`item-${index}`}
                                    className="border-none"
                                >
                                    <div
                                        className={`
                                            bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl 
                                            border transition-all duration-300 hover:shadow-xl
                                            ${hoveredItem === item.id
                                                ? 'border-primary/50 shadow-lg shadow-primary/10'
                                                : 'border-gray-200 dark:border-gray-700'
                                            }
                                        `}
                                        onMouseEnter={() => setHoveredItem(item.id)}
                                        onMouseLeave={() => setHoveredItem(null)}
                                    >
                                        <AccordionTrigger className="text-left hover:no-underline p-6 group">
                                            <div className="flex items-start gap-4 w-full">
                                                <div className="p-2 bg-primary/10 rounded-lg shrink-0 group-hover:bg-primary/20 transition-colors">
                                                    <Icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                                                        {item.question}
                                                    </div>
                                                    <div className="text-sm text-primary/80 font-medium">
                                                        {item.category}
                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="px-6 pb-6">
                                            <div className="ml-12 space-y-4">
                                                <div className="flex items-center gap-2 text-primary font-semibold">
                                                    <Sparkles className="h-4 w-4" />
                                                    Expert Tip
                                                </div>
                                                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 border border-primary/20">
                                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                        {item.expertTip}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                                    <Target className="h-4 w-4" />
                                                    Practice this question to build confidence
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </div>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </div>

                {/* Call to Action */}
                <div className="mt-12 text-center">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/20 rounded-2xl p-8 border border-primary/20">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to Ace Your F-1 Interview?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            Practice these questions regularly and review the expert tips to increase your chances of success.
                        </p>
                        <Link href="/scheduled-interview" className="inline-block">
                            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300">
                                <Award className="h-5 w-5 mr-2" />
                                Start Practicing Now
                            </Button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}