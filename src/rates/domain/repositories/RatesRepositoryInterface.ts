export default interface RatesRepositoryInterface {
  getAll(): Promise<any>;
  create(payload: any): Promise<any>;

}
