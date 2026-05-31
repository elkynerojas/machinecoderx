import InputError from '@/Components/InputError';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

const inputClass =
    'mt-1 block w-full rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 text-sm focus:border-violet-500 focus:ring-violet-500 focus:outline-none transition';

const labelClass = 'block text-sm font-medium text-gray-300 mb-1';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Crear cuenta" />

            <div className="mb-7">
                <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>
                <p className="text-sm text-gray-400 mt-1">
                    Únete a MachineCoderX y empieza a aprender
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="name" className={labelClass}>Nombre</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className={inputClass}
                        placeholder="Tu nombre completo"
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-1.5 text-red-400 text-xs" />
                </div>

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
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-1.5 text-red-400 text-xs" />
                </div>

                <div>
                    <label htmlFor="password" className={labelClass}>Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={inputClass}
                        placeholder="Mínimo 8 caracteres"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-1.5 text-red-400 text-xs" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className={labelClass}>
                        Confirmar contraseña
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={inputClass}
                        placeholder="Repite tu contraseña"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-1.5 text-red-400 text-xs" />
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full mt-2 py-3 px-4 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all hover:scale-[1.01] shadow-lg shadow-violet-900/40"
                >
                    {processing ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
                ¿Ya tienes cuenta?{' '}
                <Link
                    href={route('login')}
                    className="text-violet-400 hover:text-violet-300 font-medium transition"
                >
                    Inicia sesión
                </Link>
            </p>
        </AuthLayout>
    );
}
