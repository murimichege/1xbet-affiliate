export interface Website {
    id: string;
    url: string;
    category: string;
    language: string;
  status: 'active' | 'inactive' | 'pending'; // Allow multiple status values
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface WebsiteFormData {
    url: string;
    category: string;
    language: string;
  }
  
  export type WebsiteStatus = 'active';
  export type WebsiteCategory = 
    | 'Sports predictions'
    | 'Sports news'
    | 'Bookmakers and bets'
    | 'Sports broadcasts'
    | 'Casino'
    | 'Sports'
    | 'Other'
    | 'Facebook';