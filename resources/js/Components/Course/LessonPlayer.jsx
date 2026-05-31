function getYouTubeId(url) {
    const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|shorts\/))([^?&\n]+)/);
    return match ? match[1] : null;
}

function getVimeoId(url) {
    const match = url?.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
}

export default function LessonPlayer({ lesson }) {
    if (lesson.type !== 'video') return null;

    const url = lesson.video_url;
    const path = lesson.video_path;

    if (lesson.video_type === 'upload' && path) {
        return (
            <div className="relative aspect-video bg-black rounded-xl overflow-hidden">
                <video
                    key={path}
                    controls
                    className="w-full h-full"
                    src={`/storage/${path}`}
                >
                    Tu navegador no soporta reproducción de video.
                </video>
            </div>
        );
    }

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
            <p>No hay video disponible para esta lección.</p>
        </div>
    );
}
