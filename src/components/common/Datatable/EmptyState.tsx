import { Icon } from '@/components/ui';

interface EmptyStateProps {
  message: string;
  icon: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: string;
  };
}

export function EmptyState({ 
  message, 
  icon, 
  description,
  action 
}: EmptyStateProps) {
  return (
    <div className="py-16 text-center text-gray-500">
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full bg-gray-100 p-4">
          <Icon name={icon} className="text-4xl" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700">
            {message}
          </h3>
          {description && (
            <p className="text-sm max-w-sm mx-auto">
              {description}
            </p>
          )}
        </div>
        {action && (
          <button
            onClick={action.onClick}
            className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            {action.icon && <Icon name={action.icon} className="mr-2" />}
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
