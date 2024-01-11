export class WebStorage {
  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  public set(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value))
  }

  public get(key: string): any {
    const value = this.storage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  public remove(key: string): void {
    this.storage.removeItem(key)
  }

  public clear(): void {
    this.storage.clear()
  }
}

export const webLocalStorage = new WebStorage(localStorage)
export const webSessionStorage = new WebStorage(sessionStorage)
