import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHttpOptions } from './interfaces/http-options.interface';

interface IBaseRegistry<T> {
  getEntries(): Observable<T[]>;
  getEntries(options: IHttpOptions): Observable<HttpResponse<T[]>>;
  getEntries(options?: IHttpOptions): Observable<T[]> | Observable<HttpResponse<T[]>>;
  getEntry(id: number): Observable<T>;
  getEntry(id: number, options: IHttpOptions): Observable<HttpResponse<T>>;
  getEntry(id: number, options?: IHttpOptions): Observable<T>;
  createEntry(model: T): Observable<T>;
  createEntry(model: T, options: IHttpOptions): Observable<HttpResponse<T>>;
  createEntry(model: T, options?: IHttpOptions): Observable<T> | Observable<HttpResponse<T>>;
  updateEntry(model: T): Observable<T>;
  updateEntry(model: T, options: IHttpOptions): Observable<HttpResponse<T>>;
  updateEntry(model: T, options?: IHttpOptions): Observable<T> | Observable<HttpResponse<T>>;
  deleteEntry(model: T, options?: never): Observable<void>;
}

export abstract class BaseRegistry<T> implements IBaseRegistry<T> {
  abstract getEntries(): Observable<T[]>;
  abstract getEntries(options: IHttpOptions): Observable<HttpResponse<T[]>>;
  abstract getEntries(options?: IHttpOptions): Observable<T[]> | Observable<HttpResponse<T[]>>;
  abstract getEntry(id: number): Observable<T>;
  abstract getEntry(id: number, options: IHttpOptions): Observable<HttpResponse<T>>;
  abstract getEntry(id: number, options?: IHttpOptions): Observable<T> | Observable<HttpResponse<T>>;
  abstract createEntry(model: T): Observable<T>
  abstract createEntry(model: T, options: IHttpOptions): Observable<HttpResponse<T>>;
  abstract createEntry(model: T, options?: IHttpOptions): Observable<T> | Observable<HttpResponse<T>>;
  abstract updateEntry(model: T): Observable<T>
  abstract updateEntry(model: T, options: IHttpOptions): Observable<HttpResponse<T>>;
  abstract updateEntry(model: T, options?: IHttpOptions): Observable<T> | Observable<HttpResponse<T>>;
  abstract deleteEntry(model: T, options?: never): Observable<void>;
}