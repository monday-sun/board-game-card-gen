import fs from 'fs';
import { Observable, from } from 'rxjs';
import util from 'util';
import { FileProvider } from '../../types';

const readFile = util.promisify(fs.readFile);

class ContentNoWatchProvider implements FileProvider {
  constructor(private filePath: string) {}

  stream(): Observable<string> {
    return from(readFile(this.filePath, 'utf8'));
  }
}

export function createFileProvider(filePath: string) {
  const fileWatcher = new ContentNoWatchProvider(filePath);
  return fileWatcher;
}