import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Landing/Navbar';
import Hero from '@/Components/Landing/Hero';
import CoursesSection from '@/Components/Landing/CoursesSection';
import SubscriptionBanner from '@/Components/Landing/SubscriptionBanner';
import Footer from '@/Components/Landing/Footer';

export default function Welcome({ auth, categories, hasSubscription, canLogin, canRegister }) {
    const totalCourses = categories.reduce((sum, c) => sum + c.courses.length, 0);

    return (
        <>
            <Head title="MachineCoderX — Aprende sin límites" />

            <div className="min-h-screen bg-white">
                <Navbar
                    auth={auth}
                    canLogin={canLogin}
                    canRegister={canRegister}
                />

                <Hero
                    totalCourses={totalCourses}
                    totalCategories={categories.length}
                    canRegister={canRegister}
                />

                <CoursesSection
                    categories={categories}
                    hasSubscription={hasSubscription}
                />

                <SubscriptionBanner
                    hasSubscription={hasSubscription}
                    canRegister={canRegister}
                />

                <Footer />
            </div>
        </>
    );
}
