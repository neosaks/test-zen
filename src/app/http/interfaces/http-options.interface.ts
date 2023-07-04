export interface IHttpOptions {
  observe: 'response',
  params?: {
    [key: string]: string | number | any;
  }
}
