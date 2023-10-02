import HttpClientInterface, { HttpResponse, HttpMethod, HttpResquestOptions } from './HttpClientInterface';
import Logger from '../Logger';
import axios, { AxiosRequestConfig } from 'axios';
import HttpClientException from '../errors/HttpClientException';

export default class HttpClient implements HttpClientInterface {
  constructor(private readonly logger: Logger) {}

  private async request<T>(options: HttpResquestOptions): Promise<HttpResponse<T>> {
    const requestConfig: AxiosRequestConfig = {
      url: options.url,
      data: options.data,
      method: options.method,
      timeout: options.timeout,
      headers: options.headers,
    };
    return await this.executeRequest<T>(requestConfig);
  }
  private async executeRequest<T>(requestConfig: AxiosRequestConfig): Promise<HttpResponse<T>> {
    const restConfig: AxiosRequestConfig = {
      ...requestConfig,
      validateStatus: (status) => status < 500,
    };
    let response;
    try {
      this.logger.info(`Requesting ${requestConfig.url}`);
      response = await axios(restConfig);

      if (response.status >= 500) {
        this.logger.error(`Error in request ${requestConfig.url} with status ${response.status}`);
        throw new HttpClientException(response.status, response.data);
      }
      return {
        data: response.data,
        headers: response.headers,
        status: response.status,
      };
    } catch (error) {
      this.logger.error('Error in request', error);
      throw new HttpClientException('Unhandled error');
    }
  }
  async get<T>(operationId: string, url: string, timeout: number, headers?: any): Promise<HttpResponse<T>> {
    const requestConfig: HttpResquestOptions = {
      method: HttpMethod.GET,
      url,
      headers,
      operation: operationId,
      timeout,
    };

    return this.request(requestConfig);
  }
}
