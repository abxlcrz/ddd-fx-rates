import RatesRepositoryInterface from '../repositories/RatesRepositoryInterface';
import RatesServiceInterface, { FxRates } from './RatesServiceInterface';

export default class RatesService implements RatesServiceInterface {
  private ratesRepository: RatesRepositoryInterface;
  private base: string = 'EUR';
  private rates: FxRates;

  constructor(ratesRepository: RatesRepositoryInterface) {
    this.ratesRepository = ratesRepository;
  }

  async create(pair: string, fee: number, rates: FxRates): Promise<any> {
    this.rates = { [this.base]: 1, ...rates };

    if (!this.rates[this.base]) {
      throw new Error(`Base currency '${this.base}' not found in rates.`);
    }
    
    const [fromCurrency, toCurrency] = pair.split('-');
    const rate = this.getFxRate(fromCurrency, toCurrency);

    const payload = {
      pair,
      originalRate: rate,
      fee,
      feeAmount: this.getFxFeeAmount(rate, fee),
      rateWithMarkupFee: this.getFxRateWithMarkupFee(fromCurrency, toCurrency, fee),
    }

    return this.ratesRepository.create(payload);
  }

  async getAll() {
    return await this.ratesRepository.getAll();
  }

  getFxRate(fromCurrency: string, toCurrency: string): number {
    if (!this.rates[fromCurrency] || !this.rates[toCurrency]) {
      throw new Error(`Currency pair '${fromCurrency}-${toCurrency}' not supported.`);
    }

    const fxRate = this.rates[toCurrency] / this.rates[fromCurrency];
    return fxRate;
  }

  getFxFeeAmount(rate: number, feePercentage: number): number {
    return (rate * feePercentage) / 100;
  }

  getFxRateWithMarkupFee(fromCurrency: string, toCurrency: string, feePercentage: number): number {
    const fxRate = this.getFxRate(fromCurrency, toCurrency);
    const feeAmount = this.getFxFeeAmount(fxRate, feePercentage);
    return fxRate + feeAmount;
  }
}
