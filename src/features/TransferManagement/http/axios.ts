import axios, { AxiosError, AxiosInstance } from 'axios';
import { TransferFormData, ApiResponse } from './interface/Transfer';

const api: AxiosInstance = axios.create({
  baseURL: 'https://serverpruebathom-production.up.railway.app/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('Error de conexión - Verifica CORS o si el servidor está activo');
      throw new Error('No se pudo conectar al servidor. Verifica tu conexión o configuración CORS.');
    }
    return Promise.reject(error);
  }
);

export const transferService = {
  create: async (transfer: Omit<TransferFormData, 'id'>): Promise<TransferFormData> => {
    try {
      const response = await api.post<TransferFormData>('/transfers/create', transfer);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      throw new Error(axiosError.response?.data?.message || 'Error al crear la transferencia');
    }
  },

  getAll: async (): Promise<TransferFormData[]> => {
    try {
      const response = await api.get<TransferFormData[]>('/transfers/all');
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      throw new Error(axiosError.message || 'Error al obtener las transferencias');
    }
    },

  getById: async (id: string): Promise<ApiResponse<TransferFormData>> => {
    try {
      const response = await api.get<ApiResponse<TransferFormData>>(`/transfers/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      throw new Error(axiosError.response?.data?.message || 'Error al obtener la transferencia');
    }
  },

  update: async (id: string , transfer: TransferFormData): Promise<ApiResponse<TransferFormData>> => {
    try {
      const response = await api.put<ApiResponse<TransferFormData>>(`/transfers/update/${id}`, transfer);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      throw new Error(axiosError.response?.data?.message || 'Error al actualizar la transferencia');
    }
  },

  delete: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await api.delete<ApiResponse>(`/transfers/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      throw new Error(axiosError.response?.data?.message || 'Error al eliminar la transferencia');
    }
  }
};