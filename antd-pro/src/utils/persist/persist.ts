const KEY_USER = 'user';
const KEY_TOKEN = 'token';
const KEY_AUTH = 'auth';
const KEY_ORG = 'org';

class Persist {
  private namespace: string;

  private _user: any;

  private _token: string | null;

  private _auth: string[];

  private _org: any;

  constructor(namespace: string) {
    this.namespace = namespace;
    this._user = this.load(KEY_USER);
    this._token = this.load(KEY_TOKEN);
    this._auth = this.load(KEY_AUTH);
    this._org = this.load(KEY_ORG);
  }

  get user() {
    return this._user;
  }

  set user(user) {
    if (user) {
      this.save(KEY_USER, user);
      this._user = user;
    }
  }

  get token() {
    return this._token;
  }

  set token(token) {
    if (token) {
      this.save(KEY_TOKEN, token);
      this._token = token;
    }
  }

  get auth() {
    return this._auth;
  }

  set auth(auth: string | string[]) {
    if (auth) {
      const authValue = ([] as string[]).concat(auth);
      this.save(KEY_AUTH, authValue);
      this._auth = authValue;
    }
  }

  get org() {
    return this._org;
  }

  set org(org) {
    if (org) {
      this.save(KEY_ORG, org);
      this._org = org;
    }
  }

  init({
    token,
    user,
    auth = [],
    org,
  }: {
    token: string;
    user: any;
    auth?: string | string[];
    org?: any;
  }) {
    this.token = token;
    this.user = user;
    this.auth = ([] as string[]).concat(auth);
    this.org = org;
  }

  getKey(key: string) {
    return `${this.namespace}.${key}`;
  }

  save(key: string, value: any): any {
    localStorage.setItem(this.getKey(key), JSON.stringify(value));
    return value;
  }

  load(key: string): any {
    const val = localStorage.getItem(this.getKey(key));
    return val != null ? JSON.parse(val) : val;
  }

  remove(key: string): void {
    return localStorage.removeItem(this.getKey(key));
  }

  clear() {
    this.remove(KEY_TOKEN);
    this._token = null;

    this.remove(KEY_USER);
    this._user = null;

    this.remove(KEY_AUTH);
    this._auth = [];

    this.remove(KEY_ORG);
    this._org = null;
  }
}

export default Persist;
