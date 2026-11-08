export interface ApiErrorBody {
  code: string;
  message: string;
  details?: unknown;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
}

export interface ApiFailure {
  success: false;
  error: ApiErrorBody;
}

/** Consistent envelope returned by every BFF route handler. */
export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
