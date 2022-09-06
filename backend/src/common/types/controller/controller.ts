import { TokenPayload } from '@autoline/shared';
import { Request } from 'express';
import { Query, ParamsDictionary } from 'express-serve-static-core';

interface TypedRequestBody<T> extends AuthRequest {
  body: T;
}

interface TypedRequestQuery<T extends Query> extends AuthRequest {
  query: T;
}

interface TypedRequestParams<T extends ParamsDictionary> extends AuthRequest {
  params: T;
}

interface TypedRequest<T extends Query, U> extends AuthRequest {
  body: U;
  query: T;
}

interface AuthRequest extends Request {
  tokenPayload?: TokenPayload;
}

export type {
  TypedRequestBody,
  TypedRequestQuery,
  TypedRequestParams,
  TypedRequest,
  AuthRequest,
};
