import { StorageKey, HttpHeader, HttpMethod } from '@common/enums/enums';
import { getStringifiedQuery } from '@helpers/helpers';

import { HttpError } from '../../exceptions/exceptions';
import { Storage } from '../storage/storage.service';

class Http {
  private _storage: Storage;
  constructor({ storage }: { storage: Storage }) {
    this._storage = storage;
  }

  load(
    url: string,
    options: {
      method?: string;
      payload?: BodyInit;
      hasAuth?: boolean;
      contentType?: string;
      query?: Record<string, unknown>;
    } = {},
  ): Promise<void | Response> {
    const {
      method = HttpMethod.GET,
      payload = null,
      hasAuth = true,
      contentType = '',
      query = {},
    } = options;

    const headers = this._getHeaders({
      hasAuth,
      contentType,
    });

    return fetch(this._getUrl(url, query), {
      method,
      headers,
      body: payload,
    })
      .then(this._checkStatus)
      .then(this._parseJSON)
      .catch(this._throwError);
  }

  _getHeaders({
    hasAuth,
    contentType,
  }: {
    hasAuth: boolean;
    contentType: string;
  }): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this._storage.getItem(StorageKey.TOKEN);

      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  async _checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const parsedException = await response.json().catch(() => ({
        message: response.statusText,
      }));

      throw new HttpError({
        status: response.status,
        message: parsedException?.message,
      });
    }

    return response;
  }

  _getUrl(url: string, query: Record<string, unknown>): string {
    return `${url}${
      query || query !== {} ? `?${getStringifiedQuery(query)}` : ''
    }`;
  }

  _parseJSON(response: Response): Promise<Response> {
    return response.json();
  }

  _throwError(err: Error): void {
    throw err;
  }
}

export { Http };
