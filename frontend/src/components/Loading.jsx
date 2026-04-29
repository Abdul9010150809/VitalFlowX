/**
 * Loading and Skeleton Components
 * Reusable loading states and skeleton loaders
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Spinner Component
 */
export function Spinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <Loader2
      className={`animate-spin text-blue-600 ${sizeClasses[size]} ${className}`}
    />
  );
}

/**
 * Loading Overlay Component
 */
export function LoadingOverlay({ isLoading = false, message = 'Loading...' }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
}

/**
 * Skeleton Loader Component
 */
export function SkeletonLoader({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '',
  count = 1,
  circle = false,
}) {
  const items = Array.from({ length: count });

  return (
    <div className="space-y-3">
      {items.map((_, i) => (
        <div
          key={i}
          className={`${width} ${height} ${circle ? 'rounded-full' : 'rounded'} bg-gray-200 animate-pulse ${className}`}
        />
      ))}
    </div>
  );
}

/**
 * Card Skeleton Component
 */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <SkeletonLoader width="w-3/4" height="h-6" />
      <div className="space-y-2">
        <SkeletonLoader height="h-4" />
        <SkeletonLoader height="h-4" width="w-5/6" />
        <SkeletonLoader height="h-4" width="w-4/6" />
      </div>
      <div className="flex gap-2">
        <SkeletonLoader width="w-20" height="h-8" className="rounded" />
        <SkeletonLoader width="w-20" height="h-8" className="rounded" />
      </div>
    </div>
  );
}

/**
 * Table Skeleton Component
 */
export function TableSkeleton({ rows = 5, columns = 4 }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            {Array.from({ length: columns }).map((_, i) => (
              <th key={i} className="px-6 py-3">
                <SkeletonLoader height="h-4" width="w-3/4" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIdx) => (
            <tr key={rowIdx} className="border-b">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <td key={colIdx} className="px-6 py-4">
                  <SkeletonLoader height="h-4" width="w-5/6" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Spinner;
