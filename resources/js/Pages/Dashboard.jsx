import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ProgressBar from '@/Components/Course/ProgressBar';
import { Head, Link, usePage } from '@inertiajs/react';

const GRADIENTS = [
    'from-violet-500 to-indigo-600',
    'from-blue-500 to-cyan-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-amber-600',
    'from-pink-500 to-rose-600',
    'from-sky-500 to-blue-600',
];

export default function Dashboard({ enrollments, hasSubscription }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const firstName = user?.name?.split(' ')[0] ?? 'Estudiante';
    const inProgress = enrollments.filter(e => !e.finished);
    const finished   = enrollments.filter(e => e.finished);

    return (
        <AuthenticatedLayout>
            <Head title="Mis cursos" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Bienvenida */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">
                            Hola, {firstName} 👋
                        </h1>
                        <p className="text-gray-400">
                            {hasSubscription
                                ? 'Tu suscripción está activa. Sigue aprendiendo.'
                                : 'No tienes suscripción activa.'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                            hasSubscription
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                                : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}>
                            {hasSubscription ? '● Suscripción activa' : '○ Sin suscripción'}
                        </span>
                        <Link
                            href={route('home')}
                            className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg transition"
                        >
                            Explorar cursos
                        </Link>
                    </div>
                </div>

                {/* Sin cursos */}
                {enrollments.length === 0 && (
                    <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-2xl">
                        <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Aún no tienes cursos</h3>
                        <p className="text-gray-500 mb-6">Explora el catálogo y empieza a aprender hoy.</p>
                        <Link
                            href={route('home')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition"
                        >
                            Ver cursos disponibles
                        </Link>
                    </div>
                )}

                {/* En progreso */}
                {inProgress.length > 0 && (
                    <section className="mb-10">
                        <h2 className="text-lg font-semibold text-white mb-5">Continuar aprendiendo</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {inProgress.map((e, i) => (
                                <CourseProgressCard key={e.course.id} enrollment={e} index={i} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Completados */}
                {finished.length > 0 && (
                    <section>
                        <h2 className="text-lg font-semibold text-white mb-5">Completados</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {finished.map((e, i) => (
                                <CourseProgressCard key={e.course.id} enrollment={e} index={i + inProgress.length} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AuthenticatedLayout>
    );
}

function CourseProgressCard({ enrollment, index }) {
    const { course, completed, total, percent, finished } = enrollment;
    const gradient = GRADIENTS[index % GRADIENTS.length];

    return (
        <Link
            href={route('course.show', course.slug)}
            className="group bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 hover:shadow-lg transition-all"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video">
                {course.thumbnail ? (
                    <img src={`/storage/${course.thumbnail}`} alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                        <svg className="w-10 h-10 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                )}
                {finished && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                        Completado
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="p-4">
                <h3 className="font-semibold text-white line-clamp-2 mb-1 group-hover:text-violet-400 transition-colors">
                    {course.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{course.instructor?.name}</p>
                <ProgressBar completed={completed} total={total} />
            </div>
        </Link>
    );
}
