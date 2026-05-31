import { useState, useMemo, useEffect, useRef } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import CourseSidebar from '@/Components/Course/CourseSidebar';
import LessonPlayer from '@/Components/Course/LessonPlayer';
import LessonContent from '@/Components/Course/LessonContent';

export default function Show({ course, currentLessonId, completedIds: initialCompleted, totalLessons, completedCount: initialCount }) {
    const [completedIds, setCompletedIds] = useState(initialCompleted);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [marking, setMarking] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const userMenuRef = useRef(null);
    const { auth } = usePage().props;
    const user = auth?.user;
    const initials = user?.name?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() ?? '?';

    useEffect(() => {
        const handler = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const allLessons = useMemo(
        () => course.sections.flatMap(s => s.lessons),
        [course.sections]
    );

    const currentLesson = useMemo(
        () => allLessons.find(l => l.id === currentLessonId) ?? allLessons[0],
        [allLessons, currentLessonId]
    );

    const currentIndex  = allLessons.findIndex(l => l.id === currentLesson?.id);
    const prevLesson    = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
    const nextLesson    = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
    const isCompleted   = completedIds.includes(currentLesson?.id);
    const completedCount = completedIds.length;

    const selectLesson = (lessonId) => {
        router.get(
            route('course.show', course.slug),
            { lesson: lessonId },
            { preserveState: true, preserveScroll: false }
        );
    };

    const toggleComplete = async () => {
        if (!currentLesson || marking) return;
        setMarking(true);
        try {
            const res = await fetch(route('lesson.progress.toggle', currentLesson.id), {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                    'Accept': 'application/json',
                },
            });
            const data = await res.json();
            setCompletedIds(prev =>
                data.completed
                    ? [...prev, currentLesson.id]
                    : prev.filter(id => id !== currentLesson.id)
            );
            if (data.completed && nextLesson) {
                setTimeout(() => selectLesson(nextLesson.id), 600);
            }
        } finally {
            setMarking(false);
        }
    };

    const TYPE_LABELS = { video: 'Video', text: 'Texto', exercise: 'Ejercicio' };
    const LEVEL_LABELS = { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' };

    return (
        <>
            <Head title={`${currentLesson?.title ?? 'Lección'} — ${course.title}`} />

            <div className="min-h-screen bg-gray-950 flex flex-col">
                {/* Top bar */}
                <header className="h-14 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-4 flex-shrink-0 z-10">
                    <Link href={route('home')} className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                    </Link>

                    <div className="h-5 w-px bg-gray-700 flex-shrink-0" />

                    <h1 className="text-sm font-medium text-gray-300 truncate flex-1">{course.title}</h1>

                    {/* Inicio */}
                    <Link
                        href={route('home')}
                        className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition flex-shrink-0"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Inicio
                    </Link>

                    {/* User menu */}
                    {user && (
                        <div className="relative flex-shrink-0" ref={userMenuRef}>
                            <button
                                onClick={() => setUserMenuOpen(v => !v)}
                                className="w-8 h-8 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center hover:bg-violet-500 transition"
                            >
                                {initials}
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 top-10 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl py-1 z-50">
                                    <div className="px-4 py-2 border-b border-gray-700">
                                        <p className="text-xs font-medium text-white truncate">{user.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                    </div>
                                    <Link
                                        href={route('profile.edit')}
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Mi perfil
                                    </Link>
                                    <button
                                        onClick={() => router.post(route('logout'))}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Cerrar sesión
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="h-5 w-px bg-gray-700 flex-shrink-0" />

                    {/* Sidebar toggle */}
                    <button
                        onClick={() => setSidebarOpen(v => !v)}
                        className="flex-shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
                        title="Toggle sidebar"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </header>

                {/* Main layout */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    {sidebarOpen && (
                        <div className="w-80 flex-shrink-0 hidden md:flex flex-col overflow-hidden">
                            <CourseSidebar
                                course={course}
                                sections={course.sections}
                                currentLessonId={currentLesson?.id}
                                completedIds={completedIds}
                                totalLessons={totalLessons}
                                completedCount={completedCount}
                                onSelectLesson={selectLesson}
                            />
                        </div>
                    )}

                    {/* Content area */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8">
                            {/* Lesson type badge */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-violet-600/20 text-violet-300">
                                    {TYPE_LABELS[currentLesson?.type] ?? 'Lección'}
                                </span>
                                {currentLesson?.duration_seconds && (
                                    <span className="text-xs text-gray-500">
                                        {Math.round(currentLesson.duration_seconds / 60)} min
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                                {currentLesson?.title}
                            </h2>

                            {/* Video player */}
                            {currentLesson?.type === 'video' && (
                                <div className="mb-8">
                                    <LessonPlayer lesson={currentLesson} />
                                </div>
                            )}

                            {/* Text/exercise content */}
                            {currentLesson?.type !== 'video' && (
                                <div className="mb-8">
                                    <LessonContent lesson={currentLesson} />
                                </div>
                            )}

                            {/* Actions bar */}
                            <div className="flex items-center justify-between pt-6 border-t border-gray-800">
                                {/* Previous */}
                                <button
                                    onClick={() => prevLesson && selectLesson(prevLesson.id)}
                                    disabled={!prevLesson}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Anterior
                                </button>

                                {/* Mark complete */}
                                <button
                                    onClick={toggleComplete}
                                    disabled={marking}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                        isCompleted
                                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                                            : 'bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-900/30'
                                    }`}
                                >
                                    {isCompleted ? (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Completada
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Marcar como completada
                                        </>
                                    )}
                                </button>

                                {/* Next */}
                                <button
                                    onClick={() => nextLesson && selectLesson(nextLesson.id)}
                                    disabled={!nextLesson}
                                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
                                >
                                    Siguiente
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </main>
                </div>

                {/* Mobile sidebar drawer */}
                {sidebarOpen && (
                    <div className="md:hidden fixed inset-0 z-40 flex">
                        <div className="w-80 flex flex-col bg-gray-900 border-r border-gray-800 overflow-hidden">
                            <CourseSidebar
                                course={course}
                                sections={course.sections}
                                currentLessonId={currentLesson?.id}
                                completedIds={completedIds}
                                totalLessons={totalLessons}
                                completedCount={completedCount}
                                onSelectLesson={(id) => { selectLesson(id); setSidebarOpen(false); }}
                            />
                        </div>
                        <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
                    </div>
                )}
            </div>
        </>
    );
}
