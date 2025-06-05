interface LoadingStateProps {
  rows?: number;
  columns?: number;
}

export function LoadingState({ 
  rows = 5, 
  columns = 4 
}: LoadingStateProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-10 w-64 rounded-lg animate-pulse bg-gray-200" />
        <div className="h-10 w-32 rounded-lg animate-pulse bg-gray-200" />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {Array.from({ length: columns }).map((_, index) => (
                  <th key={index} className="px-6 py-3">
                    <div className="h-4 rounded animate-pulse bg-gray-300" style={{ width: `${Math.random() * 40 + 60}%` }} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <div
                        className="h-4 rounded animate-pulse bg-gray-200"
                        style={{ width: `${Math.random() * 60 + 40}%`, animationDelay: `${(rowIndex * columns + colIndex) * 0.1}s` }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
