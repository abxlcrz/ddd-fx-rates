export default interface FixerGatewayInterface {
  getRates(): Promise<GetRatesResponse>;
}

export type GetRatesResponse = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    BRL: number;
    ARS: number;
    USD: number;
  };

};