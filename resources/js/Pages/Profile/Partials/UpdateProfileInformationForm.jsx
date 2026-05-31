import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

const inputClass = 'mt-1 block w-full rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 text-sm focus:border-violet-500 focus:ring-violet-500 focus:outline-none transition';
const labelClass = 'block text-sm font-medium text-gray-300 mb-1';

export default function UpdateProfileInformationForm({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section>
            <header className="mb-6">
                <h2 className="text-lg font-semibold text-white">Información personal</h2>
                <p className="mt-1 text-sm text-gray-400">Actualiza tu nombre y correo electrónico.</p>
            </header>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="name" className={labelClass}>Nombre</label>
                    <input
                        id="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className={inputClass}
                        required
                        autoComplete="name"
                    />
                    <InputError message={errors.name} className="mt-1.5 text-red-400 text-xs" />
                </div>

                <div>
                    <label htmlFor="email" className={labelClass}>Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className={inputClass}
                        required
                        autoComplete="username"
                    />
                    <InputError message={errors.email} className="mt-1.5 text-red-400 text-xs" />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-sm text-amber-400">
                        Tu correo no está verificado.{' '}
                        <Link href={route('verification.send')} method="post" as="button" className="underline hover:text-amber-300">
                            Reenviar verificación
                        </Link>
                        {status === 'verification-link-sent' && (
                            <p className="mt-1 text-emerald-400">Enlace enviado a tu correo.</p>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-xl transition"
                    >
                        Guardar cambios
                    </button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-400">Guardado.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
