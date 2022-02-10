export interface IToast {
  type: 'success' | 'error' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}
