import React from 'react';
import { Card, Icon } from '@/components/ui';

// ============================================================================
// SKELETON - Basic gray box
// ============================================================================

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

// ============================================================================
// SPINNER - Simple spinning icon
// ============================================================================

export const Spinner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <Icon name="fas fa-spinner fa-spin" className={`text-gray-400 ${className}`} />
);

// ============================================================================
// FORM SKELETON - Form loading state
// ============================================================================

export const FormSkeleton: React.FC = () => (
  <Card className="p-6">
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/4" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-10" />
        <Skeleton className="h-10" />
      </div>
      <Skeleton className="h-10" />
      <div className="flex gap-2">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  </Card>
);

// ============================================================================
// TABLE SKELETON - Table loading state
// ============================================================================

export const TableSkeleton: React.FC = () => (
  <Card>
    <div className="p-6 border-b">
      <Skeleton className="h-6 w-1/4 mb-2" />
      <Skeleton className="h-4 w-1/6" />
    </div>
    <div className="p-6">
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4">
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
            <Skeleton className="h-6" />
          </div>
        ))}
      </div>
    </div>
  </Card>
);

// ============================================================================
// PAGE SKELETON - Complete page loading
// ============================================================================

export const PageSkeleton: React.FC = () => (
  <div className="space-y-6">
    <FormSkeleton />
    <TableSkeleton />
  </div>
);

// ============================================================================
// LOADING MESSAGE - Centered loading with text
// ============================================================================

export const LoadingMessage: React.FC<{ text?: string }> = ({ 
  text = "Loading..." 
}) => (
  <div className="flex flex-col items-center justify-center py-12">
    <Spinner className="w-8 h-8 mb-4" />
    <p className="text-gray-600">{text}</p>
  </div>
);