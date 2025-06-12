import { ColumnDef } from '@tanstack/react-table';
import { Button, Icon } from '@/components/ui';
import { copyToClipboard } from '@/utils/helpers';
import { useToast } from '@/components/ui';
import type { AffiliateLink, PromoCode } from '@/types/affiliate';

const useCopy = () => {
  const toast = useToast();
  return async (value: string, label: string) => {
    try {
      await copyToClipboard(value);
      toast.success(`${label} copied!`);
    } catch {
      toast.error(`Failed to copy ${label.toLowerCase()}`);
    }
  };
};

export const affiliateLinkColumns: ColumnDef<AffiliateLink>[] = [
  {
    accessorKey: 'xid',
    header: 'ID',
    // size: 20,
    cell: ({ getValue }) => (
      <span className="font-mono text-sm text-gray-600">#{getValue() as number}</span>
    )
  },

  {
    accessorKey: 'campaignName',
    header: 'Campaign',
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700 font-medium">{getValue() as string}</span>
    )
  },
  {
    accessorKey: 'generatedLink',
    header: 'Generated Link',
    size: 200,
    cell: ({ getValue }) => {
      const url = getValue() as string;
      const copy = useCopy();
      
      const displayUrl = (() => {
        try {
          const urlObj = new URL(url);
          return `${urlObj.hostname}${urlObj.pathname.length > 20 ? urlObj.pathname.substring(0, 17) + '...' : urlObj.pathname}`;
        } catch {
          return url.length > 25 ? url.substring(0, 22) + '...' : url;
        }
      })();

      return (
        <div className="flex items-center gap-2">
          <span className="font-mono text-blue-600 text-sm truncate flex-1">{displayUrl}</span>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-6 w-6 p-0" 
            onClick={() => copy(url, 'Link')}
          >
            <Icon name="fas fa-copy" className="text-xs" />
          </Button>
        </div>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    size: 120,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-600">
        {new Date(getValue() as string).toLocaleDateString()}
      </span>
    )
  }
];

export const promoCodeColumns: ColumnDef<PromoCode>[] = [
  {
    accessorKey: 'xid',
    header: 'ID',
    size: 80,
    cell: ({ getValue }) => (
      <span className="font-mono text-sm text-gray-600">#{getValue() as number}</span>
    )
  },
  {
    accessorKey: 'code',
    header: 'Promo Code',
    size: 180,
    cell: ({ getValue }) => {
      const code = getValue() as string;
      const copy = useCopy();

      return (
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-blue-600 text-sm">{code}</span>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-6 w-6 p-0" 
            onClick={() => copy(code, 'Promo code')}
          >
            <Icon name="fas fa-copy" className="text-xs" />
          </Button>
        </div>
      );
    }
  },
  {
    accessorKey: 'campaignName',
    header: 'Campaign',
    size: 120,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-700 font-medium">{getValue() as string}</span>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 100,
    cell: ({ getValue }) => {
      const status = getValue() as string;
      const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        active: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        declined: 'bg-red-100 text-red-800'
      };
      
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
          {status.toUpperCase()}
        </span>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    size: 120,
    cell: ({ getValue }) => (
      <span className="text-sm text-gray-600">
        {new Date(getValue() as string).toLocaleDateString()}
      </span>
    )
  }
];