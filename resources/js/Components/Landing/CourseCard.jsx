import { Link } from '@inertiajs/react';

const LEVEL_STYLES = {
    beginner:     { label: 'Principiante', classes: 'bg-emerald-100 text-emerald-700' },
    intermediate: { label: 'Intermedio',   classes: 'bg-amber-100 text-amber-700' },
    advanced:     { label: 'Avanzado',     classes: 'bg-red-100 text-red-700' },
};

const CATEGORY_GRADIENTS = [
    'from-violet-500 to-indigo-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-amber-600',
    'from-pink-500 to-rose-600',
    'from-sky-500 to-blue-600',
    'from-fuchsia-500 to-purple-600',
    'from-lime-500 to-green-600',
];

function StarRating({ value, count }) {
    const stars = Math.round(value);
    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className={`w-3.5 h-3.5 ${s <= stars ? 'text-amber-400' : 'text-gray-200'}`}
                        fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <span className="text-xs text-gray-500">{value > 0 ? value.toFixed(1) : '—'}</span>
            {count > 0 && <span className="text-xs text-gray-400">({count})</span>}
        </div>
    );
}

function Avatar({ name }) {
    const initials = name?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() || '?';
    return (
        <div className="w-6 h-6 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
            {initials}
        </div>
    );
}

export default function CourseCard({ course, hasSubscription, categoryIndex = 0, onClick }) {
    const level = LEVEL_STYLES[course.level] ?? { label: course.level, classes: 'bg-gray-100 text-gray-600' };
    const gradient = CATEGORY_GRADIENTS[categoryIndex % CATEGORY_GRADIENTS.length];
    const avgRating = course.ratings?.length
        ? course.ratings.reduce((s, r) => s + r.value, 0) / course.ratings.length
        : 0;

    return (
        <Link
            href={route('course.show', course.slug)}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
                {course.thumbnail ? (
                    <img src={`/storage/${course.thumbnail}`} alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <svg className="w-12 h-12 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}
                {/* Lock overlay */}
                {!hasSubscription && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
                {/* Level badge */}
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${level.classes}`}>
                    {level.label}
                </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-violet-700 transition-colors">
                    {course.title}
                </h3>

                {/* Instructor */}
                <div className="flex items-center gap-2 mb-3">
                    <Avatar name={course.instructor?.name} />
                    <span className="text-xs text-gray-500 truncate">{course.instructor?.name}</span>
                </div>

                {/* Metrics */}
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        {course.sections_count} secciones
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {course.lessons_count} lecciones
                    </span>
                </div>

                {/* Rating */}
                <div className="mb-4">
                    <StarRating value={avgRating} count={course.ratings?.length ?? 0} />
                </div>

                {/* Footer */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div>
                        {course.price ? (
                            <span className="text-lg font-bold text-gray-900">
                                ${parseFloat(course.price).toFixed(2)}
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-emerald-600">Gratis</span>
                        )}
                    </div>
                    {hasSubscription ? (
                        <span className="px-3 py-1.5 text-xs font-semibold text-violet-700 bg-violet-50 rounded-lg">
                            Acceder →
                        </span>
                    ) : (
                        <span className="px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 rounded-lg">
                            Suscríbete
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
