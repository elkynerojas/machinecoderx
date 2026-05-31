import { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import CourseSidebar from '@/Components/Course/CourseSidebar';
import LessonPlayer from '@/Components/Course/LessonPlayer';
import LessonContent from '@/Components/Course/LessonContent';

export default function Show({ course, currentLessonId, completedIds: initialCompleted, totalLessons, completedCount: initialCount }) {
    const [completedIds, setCompletedIds] = useState(initialCompleted);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [marking, setMarking] = useState(false);

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
