import InputError from '@/Components/InputError';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

const inputClass = 'mt-1 block w-full rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2.5 text-sm focus:border-violet-500 focus:ring-violet-500 focus:outline-none transition';
const labelClass = 'block text-sm font-medium text-gray-300 mb-1';

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section>
            <header className="mb-6">
                <h2 className="text-lg font-semibold text-white">Cambiar contraseña</h2>
                <p className="mt-1 text-sm text-gray-400">Usa una contraseña larga y segura.</p>
            </header>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <label htmlFor="current_password" className={labelClass}>Contraseña actual</label>
                    <input
                        id="current_password"
                        type="password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className={inputClass}
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-1.5 text-red-400 text-xs" />
                </div>

                <div>
                    <label htmlFor="password" className={labelClass}>Nueva contraseña</label>
                    <input
                        id="password"
                        type="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className={inputClass}
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-1.5 text-red-400 text-xs" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className={labelClass}>Confirmar nueva contraseña</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className={inputClass}
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-1.5 text-red-400 text-xs" />
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-semibold rounded-xl transition"
                    >
                        Actualizar contraseña
                    </button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-emerald-400">Contraseña actualizada.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
