import { useState, useMemo } from 'react';
import CourseCard from './CourseCard';

export default function CoursesSection({ categories, hasSubscription }) {
    const [activeCategory, setActiveCategory] = useState('all');

    const allCourses = useMemo(() =>
        categories.flatMap(c => c.courses.map(course => ({ ...course, _categoryIndex: c.id % 8 }))),
        [categories]
    );

    const displayedCourses = useMemo(() => {
        if (activeCategory === 'all') return allCourses;
        const cat = categories.find(c => c.slug === activeCategory);
        return cat ? cat.courses.map(course => ({ ...course, _categoryIndex: cat.id % 8 })) : [];
    }, [activeCategory, categories, allCourses]);

    return (
        <section id="courses" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Explorar cursos
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Encuentra el curso perfecto para alcanzar tus objetivos
                    </p>
                </div>

                {/* Category tabs */}
                <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                            activeCategory === 'all'
                                ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-violet-300 hover:text-violet-600'
                        }`}
                    >
                        Todos
                        <span className={`ml-2 text-xs ${activeCategory === 'all' ? 'text-violet-200' : 'text-gray-400'}`}>
                            {allCourses.length}
                        </span>
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.slug}
                            onClick={() => setActiveCategory(cat.slug)}
                            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                activeCategory === cat.slug
                                    ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:border-violet-300 hover:text-violet-600'
                            }`}
                        >
                            {cat.name}
                            <span className={`ml-2 text-xs ${activeCategory === cat.slug ? 'text-violet-200' : 'text-gray-400'}`}>
                                {cat.courses.length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Course grid */}
                {displayedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayedCourses.map(course => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                hasSubscription={hasSubscription}
                                categoryIndex={course._categoryIndex}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p>No hay cursos en esta categoría aún.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
