import RatesServiceInterface from 'src/rates/domain/services/RatesServiceInterface';
import UseCase from './UseCaseInterface';
import { RateRequestBody } from 'src/rates/infraestructure/controllers/RatesController';
import FixerGatewayInterface from 'src/rates/infraestructure/gateways/FixerGatewayInterface';

export default class CreateRateUseCase implements UseCase<any, any> {
  private ratesService: RatesServiceInterface;
  private fixerGateway: FixerGatewayInterface;

  constructor(ratesService: RatesServiceInterface, fixerGateway: FixerGatewayInterface) {
    this.ratesService = ratesService;
    this.fixerGateway = fixerGateway;
  }

  async execute(payload: RateRequestBody): Promise<any> {
    const { pair, fee } = payload;
    const rates = await this.fixerGateway.getRates();
    return this.ratesService.create(pair, fee, rates.rates);
  }
}
