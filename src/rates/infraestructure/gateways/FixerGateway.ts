import FixerGatewayInterface, { GetRatesResponse } from './FixerGatewayInterface';
import HttpClientInterface from '../clients/HttpClientInterface';

export default class FixerGateway implements FixerGatewayInterface {
  private httpClient: HttpClientInterface;
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  async getRates(): Promise<GetRatesResponse> {
    const url = `http://data.fixer.io/api/latest?access_key=824e753b9d8f1bf170e5adf80e7788e9&base=EUR&symbols=BRL,ARS,USD`;
    const result = await this.httpClient.get<GetRatesResponse>('getOrderbookTips', url, 10000);
    return result.data;
  }
}
