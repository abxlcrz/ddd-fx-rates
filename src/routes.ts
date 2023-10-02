import { Server } from '@hapi/hapi';
import RatesController from './rates/infraestructure/controllers/RatesController';

export default function routes(app: Server, controller: RatesController) {
  app.route({
    method: 'GET',
    path: '/rates',
    handler: async (request, h) => {
      return await controller.getAllRates(request, h);
    },
  });
  app.route({
    method: 'POST',
    path: '/rates',
    handler: async (request, h) => {
      return await controller.createRate(request, h);
    },
  });
}
