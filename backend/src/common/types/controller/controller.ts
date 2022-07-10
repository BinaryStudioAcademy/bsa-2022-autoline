import { Request } from 'express';
import { Query } from 'express-serve-static-core';

interface TypedRequestBody<T> extends Request {
  body: T;
}

interface TypedRequestQuery<T extends Query> extends Request {
  query: T;
}

interface TypedRequest<T extends Query, U> extends Request {
  body: U;
  query: T;
}

export type { TypedRequestBody, TypedRequestQuery, TypedRequest };
