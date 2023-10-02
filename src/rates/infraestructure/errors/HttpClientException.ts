export default class HttpClientException extends Error {
  constructor(message: string, error?: Error) {
    super(message);
    this.name = 'HttpClientException';
    this.stack = error?.stack;
    Error.captureStackTrace(this);
  }
}
