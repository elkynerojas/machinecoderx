export default function ProgressBar({ completed, total }) {
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                <span>{completed} de {total} lecciones</span>
                <span className="font-medium text-violet-400">{percent}%</span>
            </div>
            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                />
            </div>
        </div>
    );
}
