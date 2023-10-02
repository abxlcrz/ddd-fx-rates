import { Request, ResponseToolkit } from '@hapi/hapi';
import UseCase from 'src/rates/application/usecases/UseCaseInterface';
import Logger from '../Logger';

export interface RateRequestBody {
  pair: string;
  fee: number;
}
export default class RatesController {
  getAllRatesUseCase: UseCase<any, any>;
  createRateUseCase: UseCase<any, any>;
  logger: Logger;

  constructor(getAllRates: UseCase<any, any>, createRate: UseCase<any, any>, logger: Logger) {
    this.getAllRatesUseCase = getAllRates;
    this.createRateUseCase = createRate;
    this.logger = logger;
  }

  async getAllRates(request: Request, h: ResponseToolkit) {
    try {
      const pairs = await this.getAllRatesUseCase.execute({});
      return h.response({ data: pairs }).code(200);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async createRate(request: Request, h: ResponseToolkit) {
    try {
      const body = request.payload as RateRequestBody;
      const rate = await this.createRateUseCase.execute(body);
      return h.response({data:rate}).code(201);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
