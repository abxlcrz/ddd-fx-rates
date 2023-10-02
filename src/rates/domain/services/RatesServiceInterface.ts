export default interface RatesServiceInterface {
  getAll(): Promise<any>;
  create(pair: string, fee: number, rates: FxRates): Promise<any>;
}

export interface FxRates {
  [currency: string]: number;
}
