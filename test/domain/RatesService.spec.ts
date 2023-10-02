import { expect } from 'chai';
import { stub } from 'sinon';
import RatesService from 'src/rates/domain/services/RatesService';
describe('RatesService', () => {
  // Mocked RatesRepository
  const ratesRepository = {
    create: stub().resolves({}),
    getAll: stub().resolves([]),
  };

  const ratesService = new RatesService(ratesRepository);

  describe('create', () => {
    it('should create a new rate', async () => {
      const pair = 'USD-EUR';
      const fee = 2.5;
      const rates = { USD: 1.2, EUR: 1.0 };

      const result = await ratesService.create(pair, fee, rates);

      expect(result).to.exist;
      expect(ratesRepository.create.calledOnce).to.be.true;
    });
  });

  describe('getFxRate', () => {
    it('should calculate the FX rate correctly', () => {
      const fromCurrency = 'USD';
      const toCurrency = 'EUR';
      ratesService['rates'] = { USD: 1.2, EUR: 1.0 };

      const fxRate = ratesService.getFxRate(fromCurrency, toCurrency);
      const expectedFxRate = 1.0/1.2;
      expect(fxRate).to.equal((expectedFxRate));
    });

    it('should throw an error for unsupported currency pair', () => {
      const fromCurrency = 'USD';
      const toCurrency = 'GBP';
      ratesService['rates'] = { USD: 1.2, EUR: 1.0 };

      expect(() => ratesService.getFxRate(fromCurrency, toCurrency)).to.throw(
        "Currency pair 'USD-GBP' not supported."
      );
    });
  });

});
