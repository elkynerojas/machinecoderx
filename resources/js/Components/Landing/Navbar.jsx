import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar({ auth, canLogin, canRegister }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <span className={`font-bold text-lg tracking-tight transition-colors ${
                            scrolled ? 'text-gray-900' : 'text-white'
                        }`}>
                            MachineCoderX
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-3">
                        {auth?.user ? (
                            <>
                                <div className={`text-sm font-medium transition-colors ${
                                    scrolled ? 'text-gray-600' : 'text-white/80'
                                }`}>
                                    Hola, {auth.user.name.split(' ')[0]}
                                </div>
                                <Link
                                    href={route('dashboard')}
                                    className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition"
                                >
                                    Mi Dashboard
                                </Link>
                            </>
                        ) : (
                            <>
                                {canLogin && (
                                    <Link
                                        href={route('login')}
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                                            scrolled
                                                ? 'text-gray-700 hover:bg-gray-100'
                                                : 'text-white/90 hover:bg-white/10'
                                        }`}
                                    >
                                        Iniciar sesión
                                    </Link>
                                )}
                                {canRegister && (
                                    <Link
                                        href={route('register')}
                                        className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-lg hover:bg-violet-700 transition"
                                    >
                                        Registrarse
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden p-2 rounded-lg"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg className={`w-6 h-6 transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {menuOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            }
                        </svg>
                    </button>
                </div>

                {/* Mobile menu */}
                {menuOpen && (
                    <div className="md:hidden bg-white rounded-2xl shadow-xl mt-2 p-4 flex flex-col gap-2">
                        {auth?.user ? (
                            <Link href={route('dashboard')}
                                className="px-4 py-2 text-sm font-medium text-center text-white bg-violet-600 rounded-lg hover:bg-violet-700">
                                Mi Dashboard
                            </Link>
                        ) : (
                            <>
                                {canLogin && (
                                    <Link href={route('login')}
                                        className="px-4 py-2 text-sm font-medium text-center text-gray-700 hover:bg-gray-50 rounded-lg">
                                        Iniciar sesión
                                    </Link>
                                )}
                                {canRegister && (
                                    <Link href={route('register')}
                                        className="px-4 py-2 text-sm font-medium text-center text-white bg-violet-600 rounded-lg hover:bg-violet-700">
                                        Registrarse
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
