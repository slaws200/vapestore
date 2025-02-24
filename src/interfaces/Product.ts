export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    description?: string; // Описание может быть необязательным
    count?: number;
    available: boolean
  }
  