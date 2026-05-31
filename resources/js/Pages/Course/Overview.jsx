import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import Footer from '@/Components/Landing/Footer';

const LEVEL_STYLES = {
    beginner:     { label: 'Principiante', classes: 'bg-emerald-100 text-emerald-700' },
    intermediate: { label: 'Intermedio',   classes: 'bg-amber-100 text-amber-700' },
    advanced:     { label: 'Avanzado',     classes: 'bg-red-100 text-red-700' },
};

function StarRating({ ratings }) {
    if (!ratings?.length) return <span className="text-gray-500 text-sm">Sin valoraciones</span>;
    const avg = ratings.reduce((s, r) => s + r.value, 0) / ratings.length;
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex">
                {[1,2,3,4,5].map(s => (
                    <svg key={s} className={`w-4 h-4 ${s <= Math.round(avg) ? 'text-amber-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <span className="text-sm text-gray-400">{avg.toFixed(1)} ({ratings.length})</span>
        </div>
    );
}

export default function Overview({ course }) {
    const [openSection, setOpenSection] = useState(null);
    const level = LEVEL_STYLES[course.level] ?? { label: course.level, classes: 'bg-gray-100 text-gray-600' };

    return (
        <>
            <Head title={`${course.title} — MachineCoderX`} />

            <div className="min-h-screen bg-gray-950">
                <Navbar />

                {/* Hero */}
                <section className="pt-24 pb-16 border-b border-gray-800">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-10">
                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                {course.category && (
                                    <span className="text-xs font-medium text-violet-400 uppercase tracking-wider">
                                        {course.category.name}
                                    </span>
                                )}
                                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${level.classes}`}>
                                    {level.label}
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                                {course.title}
                            </h1>

                            <div className="mb-4">
                                <StarRating ratings={course.ratings} />
                            </div>

                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold">
                                    {course.instructor?.name?.split(' ').slice(0,2).map(n=>n[0]).join('')}
                                </div>
                                <span className="text-sm text-gray-400">{course.instructor?.name}</span>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                <span>{course.sections?.length ?? 0} secciones</span>
                                <span>{course.sections?.flatMap(s=>s.lessons).length ?? 0} lecciones</span>
                            </div>
                        </div>

                        {/* CTA card */}
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-24">
                                <div className="text-3xl font-bold text-white mb-1">
                                    {course.price ? `$${parseFloat(course.price).toFixed(2)}` : 'Gratis'}
                                </div>
                                <p className="text-sm text-gray-500 mb-5">precio referencial · acceso vía suscripción</p>

                                <Link
                                    href={route('register')}
                                    className="block w-full py-3 text-center font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-xl transition mb-3"
                                >
                                    Suscríbete para acceder
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="block w-full py-3 text-center text-sm font-medium text-gray-400 hover:text-white border border-gray-700 rounded-xl transition"
                                >
                                    Ya tengo cuenta
                                </Link>

                                <div className="mt-5 pt-5 border-t border-gray-800 space-y-2">
                                    {['Acceso a todos los cursos', 'Progreso guardado', 'Certificado al completar'].map(f => (
                                        <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                                            <svg className="w-3.5 h-3.5 text-violet-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Curriculum */}
                <section className="py-12">
                    <div className="max-w-3xl mx-auto px-4 sm:px-6">
                        <h2 className="text-xl font-bold text-white mb-6">Contenido del curso</h2>

                        <div className="space-y-2">
                            {course.sections?.map((section, si) => (
                                <div key={section.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                                        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-800/50 transition"
                                    >
                                        <span className="font-medium text-gray-200">
                                            {si + 1}. {section.title}
                                        </span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs text-gray-500">{section.lessons?.length ?? 0} lecciones</span>
                                            <svg className={`w-4 h-4 text-gray-500 transition-transform ${openSection === section.id ? 'rotate-180' : ''}`}
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </button>

                                    {openSection === section.id && (
                                        <div className="border-t border-gray-800">
                                            {section.lessons?.map(lesson => (
                                                <div key={lesson.id} className="flex items-center gap-3 px-5 py-3 border-b border-gray-800/50 last:border-0">
                                                    <svg className="w-4 h-4 text-gray-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-sm text-gray-400 flex-1">{lesson.title}</span>
                                                    {lesson.is_free_preview && (
                                                        <span className="text-xs text-violet-400 font-medium">Vista previa</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
