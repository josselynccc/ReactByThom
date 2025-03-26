export interface TransferFormData {
    id?: string ;
    name: string;
    accountNumber: string;
    amount: number;
    description: string;
    email: string;
    pin: string;
  }

export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
  }