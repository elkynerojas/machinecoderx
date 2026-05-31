import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Mi perfil" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
                <h1 className="text-2xl font-bold text-white">Mi perfil</h1>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8">
                    <UpdatePasswordForm />
                </div>

                <div className="bg-gray-900 border border-red-900/40 rounded-2xl p-6 sm:p-8">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
