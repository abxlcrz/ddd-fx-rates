import Logger from './rates/infraestructure/Logger';
import RatesService from './rates/domain/services/RatesService';
import HttpClient from './rates/infraestructure/clients/HttpClient';
import MongoDBClient from './rates/infraestructure/clients/MongoDBClient';
import RatesController from './rates/infraestructure/controllers/RatesController';
import FixerGateway from './rates/infraestructure/gateways/FixerGateway';
import RatesRepository, { RateDTO, RateSchema } from './rates/infraestructure/repositories/RatesRepository';
import mongoose from 'mongoose';
import GetRatesUseCase from './rates/application/usecases/GetRates';
import CreateRateUseCase from './rates/application/usecases/CreateRate';

export default function dependencies() {
  const logger = new Logger();
  //clients
  const httpClient = new HttpClient(logger);
  const mongoDBClient = new MongoDBClient('mongodb://test:1234@localhost:27017/test?authSource=admin', {}, logger);
  const rateModel = mongoose.model<RateDTO>('Rate', RateSchema);

  //gateways
  const fixerGateway = new FixerGateway(httpClient);
  
  //repositories
  const ratesRepository = new RatesRepository(rateModel);

  //services
  const ratesService = new RatesService(ratesRepository);

  //usecases
  const getRatesUseCase = new GetRatesUseCase(ratesService);
  const createRateUseCase = new CreateRateUseCase(ratesService, fixerGateway);

  //controllers
  const ratesController = new RatesController(getRatesUseCase, createRateUseCase,logger);

  return {
    logger,
    mongoDBClient,
    ratesController,
  };
}
