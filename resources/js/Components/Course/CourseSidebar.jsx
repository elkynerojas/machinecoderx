import { useState } from 'react';
import ProgressBar from './ProgressBar';

const TYPE_ICONS = {
    video: (
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
        </svg>
    ),
    text: (
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
    ),
    exercise: (
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
        </svg>
    ),
};

function formatDuration(seconds) {
    if (!seconds) return null;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return s > 0 ? `${m}m ${s}s` : `${m}m`;
}

export default function CourseSidebar({ course, sections, currentLessonId, completedIds, totalLessons, completedCount, onSelectLesson }) {
    const activeSectionId = sections.find(s => s.lessons.some(l => l.id === currentLessonId))?.id;
    const [openSections, setOpenSections] = useState(() => new Set([activeSectionId]));

    const toggleSection = (id) => {
        setOpenSections(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    return (
        <aside className="flex flex-col h-full bg-gray-900 border-r border-gray-800 overflow-hidden">
            {/* Course header */}
            <div className="p-4 border-b border-gray-800 flex-shrink-0">
                <h2 className="text-sm font-semibold text-white line-clamp-2 mb-3">{course.title}</h2>
                <ProgressBar completed={completedCount} total={totalLessons} />
            </div>

            {/* Sections */}
            <nav className="flex-1 overflow-y-auto py-2">
                {sections.map((section, si) => (
                    <div key={section.id}>
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-800/50 transition"
                        >
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                {si + 1}. {section.title}
                            </span>
                            <svg
                                className={`w-4 h-4 text-gray-500 transition-transform ${openSections.has(section.id) ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {openSections.has(section.id) && (
                            <div>
                                {section.lessons.map((lesson) => {
                                    const isActive    = lesson.id === currentLessonId;
                                    const isCompleted = completedIds.includes(lesson.id);

                                    return (
                                        <button
                                            key={lesson.id}
                                            onClick={() => onSelectLesson(lesson.id)}
                                            className={`w-full flex items-start gap-3 px-4 py-2.5 text-left transition group
                                                ${isActive
                                                    ? 'bg-violet-600/15 border-l-2 border-violet-500'
                                                    : 'border-l-2 border-transparent hover:bg-gray-800/40'
                                                }`}
                                        >
                                            {/* Completion indicator */}
                                            <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border
                                                ${isCompleted
                                                    ? 'bg-emerald-500 border-emerald-500'
                                                    : isActive
                                                        ? 'border-violet-400'
                                                        : 'border-gray-600 group-hover:border-gray-400'
                                                }`}
                                            >
                                                {isCompleted && (
                                                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5 mb-0.5">
                                                    <span className={isActive ? 'text-violet-400' : isCompleted ? 'text-emerald-400' : 'text-gray-500'}>
                                                        {TYPE_ICONS[lesson.type] ?? TYPE_ICONS.text}
                                                    </span>
                                                    <span className={`text-xs font-medium truncate ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                                        {lesson.title}
                                                    </span>
                                                </div>
                                                {lesson.duration_seconds && (
                                                    <span className="text-xs text-gray-600">{formatDuration(lesson.duration_seconds)}</span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
}
