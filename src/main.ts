import { Server } from '@hapi/hapi';
import routes from './routes';
import dependencies from './deps';

const bootstrap = async () => {
  const app = new Server({
    port: 3000,
    host: 'localhost',
  });
  const {ratesController, logger,mongoDBClient} = dependencies();
  routes(app, ratesController);
  logger.debug('Starting server');

  await app.start();
  logger.debug(`Server listening on  ${app.info.uri}`);
  await mongoDBClient.connect();
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

bootstrap();
