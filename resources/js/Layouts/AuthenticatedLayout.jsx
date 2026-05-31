import { useState, useEffect, useRef } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const initials = user?.name?.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase() ?? '?';

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className="min-h-screen bg-gray-950">
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Link href={route('home')} className="flex items-center gap-2 flex-shrink-0">
                            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg text-white tracking-tight hidden sm:block">MachineCoderX</span>
                        </Link>

                        {/* Desktop nav links */}
                        <nav className="hidden md:flex items-center gap-1">
                            <Link
                                href={route('home')}
                                className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
                            >
                                Inicio
                            </Link>
                            <Link
                                href={route('dashboard')}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                                    route().current('dashboard')
                                        ? 'text-white bg-gray-800'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                }`}
                            >
                                Mis cursos
                            </Link>
                        </nav>

                        {/* Right: user avatar */}
                        <div className="flex items-center gap-3">
                            <div className="relative hidden md:block" ref={menuRef}>
                                <button
                                    onClick={() => setUserMenuOpen(v => !v)}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-800 transition"
                                >
                                    <div className="w-8 h-8 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
                                        {initials}
                                    </div>
                                    <span className="text-sm text-gray-300 hidden lg:block">{user?.name?.split(' ')[0]}</span>
                                    <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 top-12 w-52 bg-gray-800 border border-gray-700 rounded-xl shadow-xl py-1 z-50">
                                        <div className="px-4 py-3 border-b border-gray-700">
                                            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                        </div>
                                        <Link
                                            href={route('profile.edit')}
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition"
                                            onClick={() => setUserMenuOpen(false)}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Mi perfil
                                        </Link>
                                        <button
                                            onClick={() => router.post(route('logout'))}
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Cerrar sesión
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Mobile hamburger */}
                            <button
                                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
                                onClick={() => setMobileOpen(v => !v)}
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {mobileOpen
                                        ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    }
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-gray-800 px-4 py-3 space-y-1">
                        <div className="flex items-center gap-3 px-2 pb-3 mb-2 border-b border-gray-800">
                            <div className="w-9 h-9 rounded-full bg-violet-600 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                                {initials}
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                        <Link href={route('home')} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition">Inicio</Link>
                        <Link href={route('dashboard')} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition">Mis cursos</Link>
                        <Link href={route('profile.edit')} className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition">Mi perfil</Link>
                        <button
                            onClick={() => router.post(route('logout'))}
                            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-gray-800 rounded-lg transition"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </header>

            <main>{children}</main>
        </div>
    );
}
