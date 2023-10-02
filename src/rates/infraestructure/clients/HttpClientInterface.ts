export default interface HttpClientInterface {
  get<T>(operationId: string, url: string, timeout: number, headers?: any): Promise<HttpResponse<T>>;
}

export interface HttpResponse<T> {
  data: T;
  status: number;
  headers: any;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface HttpResquestOptions {
  operation: string;
  url: string;
  method: string;
  headers?: any;
  data?: any;
  timeout?: number;
}
