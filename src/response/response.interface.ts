export interface Response {
  success: boolean;
  data: any | null;
  error: ErrorDetail | null;
}

type ErrorDetail = {
  code: string;
  message: string;
};
