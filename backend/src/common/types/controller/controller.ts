import { TokenPayload } from '@autoline/shared';
import { Request } from 'express';
import { Query, ParamsDictionary } from 'express-serve-static-core';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      tokenPayload: TokenPayload;
    }
  }
}

interface TypedRequestBody<T> extends Request {
  body: T;
}

interface TypedRequestQuery<T extends Query> extends Request {
  query: T;
}

interface TypedRequestParams<T extends ParamsDictionary> extends Request {
  params: T;
}

interface TypedRequest<T extends Query, U> extends Request {
  body: U;
  query: T;
}

export type {
  TypedRequestBody,
  TypedRequestQuery,
  TypedRequestParams,
  TypedRequest,
};
