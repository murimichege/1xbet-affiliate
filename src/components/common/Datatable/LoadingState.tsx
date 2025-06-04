import React from 'react';

interface LoadingStateProps {
  darkMode: boolean;
  rows?: number;
  columns?: number;
}

export function LoadingState({ 
  darkMode, 
  rows = 5, 
  columns = 4 
}: LoadingStateProps) {
  return (
    <div className="space-y-4">
      {/* Search bar skeleton */}
      <div className="flex items-center justify-between">
        <div className={`h-10 w-64 rounded-lg animate-pulse ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`} />
        <div className={`h-10 w-32 rounded-lg animate-pulse ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`} />
      </div>

      {/* Table skeleton */}
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
            {/* Header skeleton */}
            <thead className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
              <tr>
                {Array.from({ length: columns }).map((_, index) => (
                  <th key={index} className="px-6 py-3">
                    <div className={`h-4 rounded animate-pulse ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`} style={{ width: `${Math.random() * 40 + 60}%` }} />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body skeleton */}
            <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-900' : 'divide-gray-200 bg-white'}`}>
              {Array.from({ length: rows }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: columns }).map((_, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      <div className={`h-4 rounded animate-pulse ${
                        darkMode ? 'bg-gray-700' : 'bg-gray-200'
                      }`} style={{ 
                        width: `${Math.random() * 60 + 40}%`,
                        animationDelay: `${(rowIndex * columns + colIndex) * 0.1}s`
                      }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between px-2">
        <div className={`h-8 w-32 rounded animate-pulse ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`} />
        <div className={`h-8 w-48 rounded animate-pulse ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`} />
        <div className="flex space-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={`h-8 w-8 rounded animate-pulse ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`} />
          ))}
        </div>
      </div>
    </div>
  );
}