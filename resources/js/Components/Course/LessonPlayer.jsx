import { useState, useEffect } from 'react';

function getYouTubeId(url) {
    const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([^?&\n]+)/);
    return match ? match[1] : null;
}

function getVimeoId(url) {
    const match = url?.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
}

function BunnyPlayer({ lesson }) {
    const [embedUrl, setEmbedUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setEmbedUrl(null);
        setLoading(true);
        setError(null);

        fetch(route('lesson.stream.url', lesson.id), {
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                'Accept': 'application/json',
            },
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.error ?? 'Error al obtener el video');
                return data;
            })
            .then((data) => setEmbedUrl(data.url))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [lesson.id]);

    if (loading) {
        return (
            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-gray-500">
                    <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="text-sm">Cargando video…</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center">
                <div className="text-center text-sm text-red-400 px-6">
                    <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
            <iframe
                key={embedUrl}
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={lesson.title}
            />
        </div>
    );
}

export default function LessonPlayer({ lesson }) {
    if (lesson.type !== 'video') return null;

    // Bunny Stream
    if (lesson.video_type === 'bunny') {
        return <BunnyPlayer lesson={lesson} />;
    }

    const url = lesson.video_url;
    const path = lesson.video_path;

    // Archivo local
    if (lesson.video_type === 'upload' && path) {
        return (
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                <video key={path} controls className="w-full h-full" src={`/storage/${path}`}>
                    Tu navegador no soporta reproducción de video.
                </video>
            </div>
        );
    }

    // YouTube
    const ytId = getYouTubeId(url);
    if (ytId) {
        return (
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                <iframe
                    key={ytId}
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={lesson.title}
                />
            </div>
        );
    }

    // Vimeo
    const vimeoId = getVimeoId(url);
    if (vimeoId) {
        return (
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                <iframe
                    key={vimeoId}
                    className="absolute inset-0 w-full h-full"
                    src={`https://player.vimeo.com/video/${vimeoId}`}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title={lesson.title}
                />
            </div>
        );
    }

    // URL genérica
    if (url) {
        return (
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                <video controls className="w-full h-full" src={url}>
                    Tu navegador no soporta reproducción de video.
                </video>
            </div>
        );
    }

    return (
        <div className="aspect-video bg-gray-900 rounded-xl flex items-center justify-center text-gray-500">
            <p className="text-sm">No hay video disponible para esta lección.</p>
        </div>
    );
}
