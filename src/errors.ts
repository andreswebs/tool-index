interface HTTPErrorOpt {
  cause?: any;
  expose?: boolean;
}

class HTTPError extends Error {
  constructor(status: number, message: string, opt?: HTTPErrorOpt) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = 'HTTPError';
    this.status = status;
    this.cause = opt?.cause;
    this.expose = opt?.expose || false;
    Error.captureStackTrace(this);
  }
  cause: any;
  status: number;
  expose: boolean;
}

export { HTTPError };
