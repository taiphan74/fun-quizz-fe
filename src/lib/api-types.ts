export type PlainObject = Record<string, unknown>;

export interface StandardResponse<T> {
  statusCode: number;
  message: string;
  timestamp: string;
  data: T | PlainObject | null;
}

