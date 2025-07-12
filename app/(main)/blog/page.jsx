
'use client'
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, Users, Star, ArrowRight, ChevronDown, ChevronUp, MessageCircle, Share2, Bookmark, TrendingUp, Eye, Heart, Filter, Calendar, User, Globe, Award, CheckCircle, Play, Video, FileText, Download } from 'lucide-react';

const BlogPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedPost, setExpandedPost] = useState(null);
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set());
    const [currentSlide, setCurrentSlide] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [sortBy, setSortBy] = useState('latest');

    const categories = [
        { id: 'all', name: 'All Articles', count: 48, icon: Globe, color: 'bg-purple-500' },
        { id: 'preparation', name: 'Interview Prep', count: 15, icon: BookOpen, color: 'bg-blue-500' },
        { id: 'documents', name: 'Documents', count: 12, icon: FileText, color: 'bg-green-500' },
        { id: 'questions', name: 'Q&A Guide', count: 18, icon: MessageCircle, color: 'bg-orange-500' },
        { id: 'tips', name: 'Success Tips', count: 14, icon: Award, color: 'bg-red-500' },
        { id: 'videos', name: 'Video Guides', count: 8, icon: Play, color: 'bg-indigo-500' }
    ];

    const heroSlides = [
        {
            title: "Master Your F1 Visa Interview in 2025",
            subtitle: "Complete preparation guide with 95% success rate",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80",
            cta: "Start Preparation"
        },
        {
            title: "Latest F1 Visa Updates & Changes",
            subtitle: "Stay informed with the most recent policy updates",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2087&q=80",
            cta: "Read Updates"
        },
        {
            title: "Join 50,000+ Successful Students",
            subtitle: "Real success stories and proven strategies",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            cta: "View Stories"
        }
    ];

    const stats = [
        { label: "Success Rate", value: "95%", icon: TrendingUp },
        { label: "Students Helped", value: "50K+", icon: Users },
        { label: "Articles Published", value: "200+", icon: FileText },
        { label: "Video Guides", value: "150+", icon: Video }
    ];

    const blogPosts = [
        {
            id: 1,
            title: "Ultimate F1 Visa Interview Preparation Guide 2025",
            excerpt: "Everything you need to know to ace your F1 visa interview, from document preparation to answering tough questions with confidence. This comprehensive guide covers all aspects of the interview process.",
            content: "A comprehensive guide covering all aspects of F1 visa interview preparation including document checklist, common questions, and proven strategies that have helped thousands of students succeed. Learn from real examples and expert advice.",
            author: "Sarah Johnson",
            authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            date: "2025-01-15",
            readTime: "12 min read",
            category: "preparation",
            tags: ["preparation", "documents", "interview", "2025"],
            likes: 342,
            comments: 68,
            views: 12500,
            featured: true,
            trending: true,
            difficulty: "Beginner",
            image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80"
        },
        {
            id: 2,
            title: "Top 50 F1 Visa Interview Questions & Perfect Answers",
            excerpt: "Master the most frequently asked questions in F1 visa interviews with detailed explanations and sample responses that actually work in real interviews.",
            content: "Learn how to answer critical questions about your study plans, financial support, ties to home country, and future career goals. Includes do's and don'ts for each question type with real examples.",
            author: "Michael Chen",
            authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            date: "2025-01-12",
            readTime: "15 min read",
            category: "questions",
            tags: ["questions", "answers", "strategy", "examples"],
            likes: 298,
            comments: 45,
            views: 8900,
            trending: true,
            difficulty: "Intermediate",
            image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80"
        },
        {
            id: 3,
            title: "Complete F1 Visa Document Checklist with Templates",
            excerpt: "Avoid common mistakes with this comprehensive checklist of required and recommended documents for your F1 visa interview, including downloadable templates.",
            content: "A detailed breakdown of mandatory documents, supporting materials, and organization tips to ensure you're fully prepared for your interview appointment. Includes templates and samples.",
            author: "Emily Rodriguez",
            authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            date: "2025-01-10",
            readTime: "8 min read",
            category: "documents",
            tags: ["documents", "checklist", "templates", "requirements"],
            likes: 186,
            comments: 32,
            views: 6700,
            difficulty: "Beginner",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 4,
            title: "10 Critical Mistakes That Guarantee F1 Visa Rejection",
            excerpt: "Learn from others' failures and avoid these critical mistakes that lead to visa denials. Real case studies and expert analysis included.",
            content: "Real examples of common pitfalls including inadequate financial documentation, poor communication, and insufficient preparation for specific questions. Learn what NOT to do.",
            author: "David Park",
            authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            date: "2025-01-08",
            readTime: "10 min read",
            category: "tips",
            tags: ["mistakes", "rejection", "case-studies", "analysis"],
            likes: 234,
            comments: 58,
            views: 9200,
            trending: true,
            difficulty: "Advanced",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 5,
            title: "F1 Visa Interview: Complete Video Walkthrough",
            excerpt: "Watch a complete mock F1 visa interview from start to finish with expert commentary and analysis of successful techniques.",
            content: "A step-by-step video guide showing exactly what happens during an F1 visa interview, with tips on body language, tone, and confidence building.",
            author: "Lisa Wang",
            authorImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            date: "2025-01-05",
            readTime: "25 min watch",
            category: "videos",
            tags: ["video", "walkthrough", "mock-interview", "techniques"],
            likes: 456,
            comments: 89,
            views: 15600,
            featured: true,
            difficulty: "Intermediate",
            isVideo: true,
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 6,
            title: "How to Demonstrate Strong Home Country Ties",
            excerpt: "Convince the visa officer that you'll return home after graduation with these proven strategies, examples, and documentation tips.",
            content: "Detailed strategies for demonstrating family, social, economic, and professional ties that show your clear intention to return to your home country after studies.",
            author: "Ahmed Hassan",
            authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
            date: "2025-01-03",
            readTime: "12 min read",
            category: "tips",
            tags: ["ties", "home-country", "strategy", "documentation"],
            likes: 167,
            comments: 34,
            views: 5400,
            difficulty: "Intermediate",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        }
    ];

    const trendingTopics = [
        { name: "2025 F1 Visa Updates", posts: 12 },
        { name: "Financial Documentation", posts: 8 },
        { name: "Interview Confidence", posts: 15 },
        { name: "Study Plan Tips", posts: 10 },
        { name: "Common Rejections", posts: 6 }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        if (sortBy === 'latest') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'popular') return b.likes - a.likes;
        if (sortBy === 'trending') return b.views - a.views;
        return 0;
    });

    const toggleLike = (postId) => {
        setLikedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const toggleBookmark = (postId) => {
        setBookmarkedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(postId)) {
                newSet.delete(postId);
            } else {
                newSet.add(postId);
            }
            return newSet;
        });
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner': return 'bg-green-100 text-green-800';
            case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'Advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
            {/* Navigation */}
            <nav className="bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center">
                            <div className="relative">
                                <BookOpen className="w-10 h-10 text-purple-600 mr-4 animate-pulse" />
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full animate-bounce"></div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                                    F1 Visa Hub
                                </h1>
                                <p className="text-sm text-purple-600">Your Success Partner</p>
                            </div>
                        </div>
                        <div className="hidden md:flex space-x-8">
                            {['Home', 'Blog', 'Resources', 'Success Stories', 'Community'].map((item) => (
                                <a key={item} href="#" className="text-purple-600 hover:text-purple-800 font-medium transition-all hover:scale-105 relative group">
                                    {item}
                                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Carousel */}
            <div className="relative h-96 md:h-[500px] overflow-hidden">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        style={{
                            backgroundImage: `linear-gradient(rgba(147, 51, 234, 0.7), rgba(147, 51, 234, 0.5)), url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                            <div className="text-white max-w-3xl">
                                <h2 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                                    {slide.title}
                                </h2>
                                <p className="text-xl md:text-2xl mb-8 text-purple-100 animate-fade-in-delay">
                                    {slide.subtitle}
                                </p>
                                <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 animate-bounce-subtle">
                                    {slide.cta}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white py-16 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group hover:scale-105 transition-transform">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full mb-4 group-hover:shadow-lg transition-shadow">
                                    <stat.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-purple-800 mb-2">{stat.value}</div>
                                <div className="text-purple-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent mb-6">
                        F1 Visa Interview Mastery
                    </h2>
                    <p className="text-xl md:text-2xl text-purple-600 max-w-4xl mx-auto leading-relaxed">
                        Expert-curated guides, proven strategies, and real success stories to help you ace your F1 visa interview with confidence
                    </p>
                </div>

                {/* Enhanced Search and Filter */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-purple-100">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-4 w-6 h-6 text-purple-400" />
                            <input
                                type="text"
                                placeholder="Search articles, tips, guides, and more..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowFilter(!showFilter)}
                                className={`px-6 py-4 rounded-xl font-medium transition-all flex items-center ${showFilter ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                                    }`}
                            >
                                <Filter className="w-5 h-5 mr-2" />
                                Filters
                            </button>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-6 py-4 bg-purple-100 text-purple-700 rounded-xl border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="latest">Latest</option>
                                <option value="popular">Most Popular</option>
                                <option value="trending">Trending</option>
                            </select>
                        </div>
                    </div>

                    {showFilter && (
                        <div className="mt-6 p-6 bg-purple-50 rounded-xl animate-slide-down">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {categories.map(category => {
                                    const Icon = category.icon;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`p-4 rounded-xl transition-all transform hover:scale-105 ${selectedCategory === category.id
                                                ? 'bg-purple-600 text-white shadow-lg'
                                                : 'bg-white text-purple-700 hover:bg-purple-100'
                                                }`}
                                        >
                                            <Icon className="w-6 h-6 mx-auto mb-2" />
                                            <div className="font-medium text-sm">{category.name}</div>
                                            <div className="text-xs opacity-75">({category.count})</div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Trending Topics */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 mb-12 text-white">
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                        <TrendingUp className="w-8 h-8 mr-3" />
                        Trending Topics This Week
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {trendingTopics.map((topic, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer">
                                <div className="font-medium">{topic.name}</div>
                                <div className="text-purple-200 text-sm">{topic.posts} articles</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Post */}
                {blogPosts.find(post => post.featured) && (
                    <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-2xl overflow-hidden mb-12">
                        <div className="md:flex">
                            <div className="md:w-1/2">
                                <img
                                    src={blogPosts.find(post => post.featured).image}
                                    alt="Featured post"
                                    className="w-full h-64 md:h-full object-cover"
                                />
                            </div>
                            <div className="md:w-1/2 p-8 md:p-12 text-white">
                                <div className="flex items-center mb-4">
                                    <Star className="w-6 h-6 mr-2 text-yellow-400" />
                                    <span className="text-purple-200 font-medium">Featured Article</span>
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                                    {blogPosts.find(post => post.featured).title}
                                </h3>
                                <p className="text-purple-100 text-lg mb-8 leading-relaxed">
                                    {blogPosts.find(post => post.featured).excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-purple-200">
                                        <img
                                            src={blogPosts.find(post => post.featured).authorImage}
                                            alt="Author"
                                            className="w-10 h-10 rounded-full border-2 border-purple-300"
                                        />
                                        <div>
                                            <div className="font-medium">By {blogPosts.find(post => post.featured).author}</div>
                                            <div className="text-sm">{blogPosts.find(post => post.featured).date} • {blogPosts.find(post => post.featured).readTime}</div>
                                        </div>
                                    </div>
                                    <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-purple-50 transition-all transform hover:scale-105 flex items-center">
                                        Read More <ArrowRight className="w-5 h-5 ml-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Blog Posts Grid */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {filteredPosts.map(post => (
                        <div key={post.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 group">
                            <div className="relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                {post.isVideo && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <Play className="w-16 h-16 text-white" />
                                    </div>
                                )}
                                {post.trending && (
                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                        <TrendingUp className="w-4 h-4 mr-1" />
                                        Trending
                                    </div>
                                )}
                                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(post.difficulty)}`}>
                                    {post.difficulty}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${categories.find(c => c.id === post.category)?.color || 'bg-purple-100'
                                        } text-white`}>
                                        {categories.find(c => c.id === post.category)?.name}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center mb-4">
                                    <img
                                        src={post.authorImage}
                                        alt={post.author}
                                        className="w-10 h-10 rounded-full mr-3 border-2 border-purple-200"
                                    />
                                    <div>
                                        <div className="font-medium text-gray-800">{post.author}</div>
                                        <div className="text-sm text-gray-500">{post.date}</div>
                                    </div>
                                </div>

                                <div className="flex items-center text-sm text-gray-500 mb-6">
                                    <Clock className="w-4 h-4 mr-1" />
                                    <span>{post.readTime}</span>
                                    <span className="mx-2">•</span>
                                    <Eye className="w-4 h-4 mr-1" />
                                    <span>{post.views.toLocaleString()} views</span>
                                </div>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <button
                                            onClick={() => toggleLike(post.id)}
                                            className={`flex items-center space-x-1 transition-all ${likedPosts.has(post.id)
                                                ? 'text-red-500 hover:text-red-600'
                                                : 'text-gray-500 hover:text-red-500'
                                                }`}
                                        >
                                            <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                            <span className="font-medium">{post.likes + (likedPosts.has(post.id) ? 1 : 0)}</span>
                                        </button>
                                        <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors">
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="font-medium">{post.comments}</span>
                                        </button>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => toggleBookmark(post.id)}
                                            className={`transition-all ${bookmarkedPosts.has(post.id)
                                                ? 'text-purple-600 hover:text-purple-700'
                                                : 'text-gray-400 hover:text-purple-600'
                                                }`}
                                        >
                                            <Bookmark className={`w-5 h-5 ${bookmarkedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                        </button>
                                        <button className="text-gray-400 hover:text-purple-600 transition-colors">
                                            <Share2 className="w-5 h-5" />
                                        </button>
                                        <button className="text-gray-400 hover:text-purple-600 transition-colors">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors cursor-pointer">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-105 flex items-center justify-center font-medium"
                                >
                                    {expandedPost === post.id ? (
                                        <>Hide Details <ChevronUp className="w-5 h-5 ml-2" /></>
                                    ) : (
                                        <>Read Full Article <ChevronDown className="w-5 h-5 ml-2" /></>
                                    )}
                                </button>

                                {expandedPost === post.id && (
                                    <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 animate-slide-down">
                                        <p className="text-gray-700 mb-4 leading-relaxed text-lg">{post.content}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <span className="text-sm text-purple-600 font-medium">Share this article:</span>
                                                <div className="flex space-x-2">
                                                    <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
                                                        <Share2 className="w-4 h-4" />
                                                    </button>
                                                    <button className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors">
                                                        <MessageCircle className="w-4 h-4" />
                                                    </button>
                                                    <button className="bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600 transition-colors">
                                                        <Bookmark className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors font-medium">
                                                Continue Reading
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results Message */}
                {filteredPosts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-purple-300 mb-6">
                            <Search className="w-24 h-24 mx-auto" />
                        </div>
                        <h3 className="text-3xl font-bold text-purple-800 mb-4">No articles found</h3>
                        <p className="text-xl text-purple-600 mb-8">Try adjusting your search terms or explore different categories</p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setSelectedCategory('all');
                            }}
                            className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 rounded-2xl p-12 mt-16 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

                    <div className="relative z-10">
                        <h3 className="text-4xl font-bold mb-4">Never Miss an Update!</h3>
                        <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                            Get the latest F1 visa tips, interview updates, and success stories delivered directly to your inbox every week.
                        </p>

                        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
                            <input
                                id="newsletter-email"
                                type="email"
                                required
                                placeholder="Enter your email address"
                                className="flex-1 px-6 py-4 rounded-full text-gray-800 placeholder-gray-400 border-2 border-transparent focus:outline-none focus:border-purple-300"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe to Newsletter"
                                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-purple-50 transition-all transform hover:scale-105"
                            >
                                Subscribe Now
                            </button>
                        </form>

                        <p className="text-sm text-purple-200 mt-4">
                            Join 25,000+ students who trust our guidance • No spam, unsubscribe anytime
                        </p>
                    </div>
                </div>


                {/* Quick Links & Resources */}
                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-6">
                            <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Document Templates</h3>
                        <p className="text-gray-600 mb-6">
                            Download professionally crafted templates for your F1 visa application documents
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
                            Download Templates
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                            <Video className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Video Masterclass</h3>
                        <p className="text-gray-600 mb-6">
                            Watch our comprehensive video series on F1 visa interview preparation
                        </p>
                        <button className="bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-colors">
                            Watch Now
                        </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Community Support</h3>
                        <p className="text-gray-600 mb-6">
                            Join our active community of students and get personalized advice
                        </p>
                        <button className="bg-orange-600 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-700 transition-colors">
                            Join Community
                        </button>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-12 mt-16 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20"></div>
                    <div className="relative z-10">
                        <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Ace Your F1 Visa Interview?</h3>
                        <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Join thousands of successful students who used our proven strategies and expert guidance to secure their F1 visa
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105">
                                Start Your Preparation
                            </button>
                            <button className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all">
                                Book Free Consultation
                            </button>
                        </div>
                        <div className="flex items-center justify-center mt-8 space-x-8 text-purple-200">
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                <span>95% Success Rate</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                <span>50K+ Students Helped</span>
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-5 h-5 mr-2" />
                                <span>Expert Guidance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.3s both;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default BlogPage;