export default function LessonContent({ lesson }) {
    if (lesson.type === 'video') return null;

    if (!lesson.content) {
        return (
            <div className="text-gray-500 italic">
                Esta lección no tiene contenido aún.
            </div>
        );
    }

    return (
        <div
            className="prose prose-invert prose-violet max-w-none
                        prose-headings:text-white prose-p:text-gray-300
                        prose-strong:text-white prose-a:text-violet-400
                        prose-code:text-violet-300 prose-code:bg-gray-800
                        prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
    );
}
