import mongoose, { ConnectOptions } from 'mongoose';
import Logger from '../Logger';

export default class MongoDBClient {
  private uri: string;
  private options: ConnectOptions;
  private logger: Logger;
  private client: typeof mongoose;
  constructor(uri: string, options: ConnectOptions, logger: Logger) {
    this.uri = uri;
    this.options = options;
    this.logger = logger;
    this.client = mongoose;
  }

  async connect() {
    try {
      this.logger.info('Connecting to MongoDB...');
      await this.client.connect(this.uri, this.options);
      this.logger.info('Connected to MongoDB!');
    } catch (error) {
      this.logger.error('Error connecting to MongoDB!');
      throw error;
    }
  }

  async disconnect() {
    this.logger.info('Disconnecting from MongoDB...');
    await this.client.disconnect();
    this.logger.info('Disconnected from MongoDB!');
  }
}
