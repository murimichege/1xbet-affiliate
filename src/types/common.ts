export interface NavigationItem {
    id: string;
    label: string;
    icon: string;
  }
  
  export interface FilterConfig {
    label: string;
    name: string;
    type: 'select' | 'text' | 'date';
    options?: string[];
    placeholder?: string;
    defaultValue?: string;
  }
  
  export interface TableColumn<T = any> {
    key: keyof T | string;
    header: string;
    render?: (value: any, row: T) => React.ReactNode;
    sortable?: boolean;
    width?: string;
  }
  
  export interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
  }
  
  export interface StatCardData {
    id: string;
    label: string;
    value: string;
    icon: string;
    color: string;
    bgColor: string;
  }