import { ENV } from '@common/enums/enums';

import { Auth } from './auth/auth.service.js';
import { Http } from './http/http.service.js';
import { Storage } from './storage/storage.service.js';

const storage = new Storage({
  storage: localStorage,
});

const http = new Http({
  storage,
});

const auth = new Auth({
  apiPath: ENV.API_PATH,
  http,
});

export { http, storage, auth };
