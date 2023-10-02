import { expect } from 'chai';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { RateDTO, RateSchema } from 'src/rates/infraestructure/repositories/RatesRepository';
import RatesRepository from 'src/rates/infraestructure/repositories/RatesRepository';
describe('RatesRepository', () => {
  let mongoServer: MongoMemoryServer;
  let ratesRepository: RatesRepository;

  before(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = await mongoServer.getUri();

    await mongoose.connect(mongoUri, {});
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();

    const RateModel = mongoose.model<RateDTO>('Rate', RateSchema);
    ratesRepository = new RatesRepository(RateModel);
  });

  it('should create a new rate', async () => {
    const newRate = {
      pair: 'EUR/GBP',
      originalRate: 0.9,
      fee: 0.02,
      feeAmount: 0.018,
      rateWithMarkupFee: 0.918,
    };

    const createdRate = await ratesRepository.create(newRate);

    expect(createdRate.pair).to.equal('EUR/GBP');
  });

  it('should return all rates', async () => {
    await mongoose.model('Rate').create([
      {
        pair: 'USD/EUR',
        originalRate: 1.2,
        fee: 0.01,
        feeAmount: 0.012,
        rateWithMarkupFee: 1.212,
      },
    ]);

    const allRates = await ratesRepository.getAll();

    expect(allRates).to.be.an('array').that.is.not.empty;
    expect(allRates[0].pair).to.equal('USD/EUR');
  });
});
