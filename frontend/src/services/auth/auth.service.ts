import {
  ApiPath,
  AuthApiPath,
  HttpMethod,
  ContentType,
} from '@common/enums/enums';
import { Http } from '@services/http/http.service';

class Auth {
  private _apiPath: string;
  private _http: Http;
  constructor({ apiPath, http }: { apiPath: string; http: Http }) {
    this._apiPath = apiPath;
    this._http = http;
  }

  login(payload: BodyInit): Promise<void | Response> {
    return this._http.load(
      `${this._apiPath}${ApiPath.AUTH}${AuthApiPath.LOGIN}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        hasAuth: false,
        payload: JSON.stringify(payload),
      },
    );
  }
}

export { Auth };
