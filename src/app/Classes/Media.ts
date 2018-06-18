export class Media {
  path: string;
  type: string;
  url: string;
  constructor(path: string, type: string, url: string) {
    this.path = path;
    this.type = type;
    this.url = url;
  }
}
