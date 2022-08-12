class Storage {
  private _storage: globalThis.Storage;
  constructor({ storage }: { storage: globalThis.Storage }) {
    this._storage = storage;
  }

  getItem(key: string): string | null {
    return this._storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    return this._storage.setItem(key, value);
  }

  removeItem(key: string): void {
    return this._storage.removeItem(key);
  }

  clear(): void {
    return this._storage.clear();
  }
}

export { Storage };
