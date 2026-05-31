import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm() {
    const [confirming, setConfirming] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirming(false);
        clearErrors();
        reset();
    };

    return (
        <section>
            <header className="mb-6">
                <h2 className="text-lg font-semibold text-red-400">Eliminar cuenta</h2>
                <p className="mt-1 text-sm text-gray-400">
                    Al eliminar tu cuenta se borrarán permanentemente todos tus datos. Esta acción es irreversible.
                </p>
            </header>

            <button
                onClick={() => setConfirming(true)}
                className="px-5 py-2.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/30 font-semibold rounded-xl transition text-sm"
            >
                Eliminar mi cuenta
            </button>

            {/* Confirmation modal */}
            {confirming && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                        <h3 className="text-lg font-semibold text-white mb-2">
                            ¿Confirmar eliminación de cuenta?
                        </h3>
                        <p className="text-sm text-gray-400 mb-6">
                            Esta acción no se puede deshacer. Ingresa tu contraseña para confirmar.
                        </p>

                        <form onSubmit={deleteUser} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    ref={passwordInput}
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="block w-full rounded-xl bg-gray-800 border border-gray-700 text-white px-4 py-2.5 text-sm focus:border-red-500 focus:ring-red-500 focus:outline-none"
                                    placeholder="Tu contraseña"
                                    autoFocus
                                />
                                <InputError message={errors.password} className="mt-1.5 text-red-400 text-xs" />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 rounded-xl transition"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-500 disabled:opacity-50 rounded-xl transition"
                                >
                                    Eliminar cuenta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
