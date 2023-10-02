export default interface UseCase<T, K> {
  execute(payload: T): Promise<K>;
}
