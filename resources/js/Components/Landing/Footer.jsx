import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-gray-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <span className="font-bold text-white">MachineCoderX</span>
                    </Link>

                    {/* Links */}
                    <nav className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                        <a href="#courses" className="hover:text-gray-300 transition">Cursos</a>
                        <a href="#" className="hover:text-gray-300 transition">Instructores</a>
                        <a href="#" className="hover:text-gray-300 transition">Blog</a>
                        <a href="#" className="hover:text-gray-300 transition">Contacto</a>
                    </nav>

                    {/* Copyright */}
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} MachineCoderX
                    </p>
                </div>
            </div>
        </footer>
    );
}
