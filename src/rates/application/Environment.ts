export default class Environment {
  private static readonly LOCAL = 'local';
  private static readonly ENVIRONMENT = process.env.NODE_ENV || Environment.LOCAL;

  static isLocal(): boolean {
    return this.ENVIRONMENT === this.LOCAL;
  }

  static get(): string {
    return this.ENVIRONMENT;
  }
}
