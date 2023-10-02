import UseCase from 'src/rates/application/usecases/UseCaseInterface';
import RatesServiceInterface from 'src/rates/domain/services/RatesServiceInterface';

export default class GetRatesUseCase implements UseCase<any, any> {
  private ratesService: RatesServiceInterface;
  constructor(ratesService: RatesServiceInterface) {
    this.ratesService = ratesService;
  }
  execute() {
    return this.ratesService.getAll();
  }
}
