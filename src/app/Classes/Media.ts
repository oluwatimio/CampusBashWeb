import {isNullOrUndefined} from 'util';

export class Media {
  path: string;
  type: string;
  url: string;
  constructor(path: string, type: string, url: string) {
    this.path = path;
    this.type = type;
    this.url = url;
  }
  static deepEquals(a: Media, b: Media) {
    if (isNullOrUndefined(a) || isNullOrUndefined(b)) {
      return a === b;
    }
    return a.path === b.path && a.type === b.type && a.url === b.type;
  }
}
