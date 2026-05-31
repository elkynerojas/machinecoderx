import { Link } from '@inertiajs/react';

export default function SubscriptionBanner({ hasSubscription, canRegister }) {
    if (hasSubscription) return null;

    return (
        <section className="bg-gray-950 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-600/20 border border-violet-500/30 text-violet-300 text-sm font-medium mb-8">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Acceso ilimitado
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                    Un plan.{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
                        Todo el catálogo.
                    </span>
                </h2>
                <p className="text-gray-400 text-lg mb-3">
                    Con una sola suscripción accedes a todos los cursos actuales y futuros.
                    Sin límites, sin extras.
                </p>

                {/* Price */}
                <div className="flex items-end justify-center gap-2 mb-10">
                    <span className="text-5xl font-bold text-white">Desde $49</span>
                    <span className="text-gray-400 text-lg mb-1.5">/mes</span>
                </div>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10">
                    {[
                        'Acceso a todos los cursos',
                        'Certificados de completitud',
                        'Soporte de instructores',
                        'Nuevos cursos cada mes',
                    ].map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                            <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {f}
                        </div>
                    ))}
                </div>

                {/* CTA */}
                {canRegister && (
                    <Link
                        href={route('register')}
                        className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-violet-600 rounded-xl hover:bg-violet-500 transition-all hover:scale-105 shadow-lg shadow-violet-900/50"
                    >
                        Empezar ahora
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                )}
            </div>
        </section>
    );
}
