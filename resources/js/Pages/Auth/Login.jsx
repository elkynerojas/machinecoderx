import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const inputClass =
    'mt-1 block w-full rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 text-sm focus:border-violet-500 focus:ring-violet-500 focus:outline-none transition';

const labelClass = 'block text-sm font-medium text-gray-300 mb-1';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Iniciar sesión" />

            <div className="mb-7">
                <h1 className="text-2xl font-bold text-white">Bienvenido de vuelta</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Inicia sesión para continuar aprendiendo
                </p>
            </div>

            {status && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="email" className={labelClass}>Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={inputClass}
                        placeholder="tu@correo.com"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-1.5 text-red-400 text-xs" />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1">
                        <label htmlFor="password" className={labelClass + ' mb-0'}>Contraseña</label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-xs text-violet-400 hover:text-violet-300 transition"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}
                    </div>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={inputClass}
                        placeholder="Tu contraseña"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-1.5 text-red-400 text-xs" />
                </div>

                <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                        type="checkbox"
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-violet-600 focus:ring-violet-500 focus:ring-offset-gray-900"
                    />
                    <span className="text-sm text-gray-400">Recordarme</span>
                </label>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-2 py-3 px-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all hover:scale-[1.01] shadow-lg shadow-violet-900/40"
                >
                    {processing ? 'Iniciando sesión...' : 'Iniciar sesión'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                ¿No tienes cuenta?{' '}
                <Link
                    href={route('register')}
                    className="text-violet-400 hover:text-violet-300 font-medium transition"
                >
                    Regístrate gratis
                </Link>
            </p>
        </AuthLayout>
    );
}
