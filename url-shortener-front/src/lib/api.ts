import axios from 'axios';

// Criando uma instância do axios com a configuração base
export const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aqui você pode adicionar tratamento global de erros
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Tipos para as respostas da API
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Funções auxiliares para as requisições
export const apiService = {
  // GET request
  get: async <T>(url: string) => {
    const response = await api.get<ApiResponse<T>>(url);
    return response.data;
  },

  // POST request
  post: async <T>(url: string, data: any) => {
    const response = await api.post<ApiResponse<T>>(url, data);
    return response.data;
  },

  // PUT request
  put: async <T>(url: string, data: any) => {
    const response = await api.put<ApiResponse<T>>(url, data);
    return response.data;
  },

  // DELETE request
  delete: async <T>(url: string) => {
    const response = await api.delete<ApiResponse<T>>(url);
    return response.data;
  },
};
