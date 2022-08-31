class HttpError extends Error {
  code: number;
  constructor(error: Error, code: number) {
    super(error.message);
    this.code = code;
  }
}
export { HttpError };
