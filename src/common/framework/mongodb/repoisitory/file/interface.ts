

export abstract class IFileRepository<T> {

  abstract createFile(item: T): Promise<T>

  abstract getFile(id: string): Promise<T>;

  abstract updateFile(id: string, item: T): Promise<T>;

  abstract deleteFile(id: string): Promise<string>;

}
