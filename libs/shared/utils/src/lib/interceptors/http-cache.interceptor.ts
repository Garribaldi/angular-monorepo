import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { filter, Observable, of, share, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheInterceptor<T> implements HttpInterceptor {

  private readonly cache: Map<string, HttpResponse<T>> = new Map();

  intercept(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

    const ignoreCache = request.headers.get('x-ignore-cache') === 'true';

    if (request.method !== 'GET' || ignoreCache) {
      return next.handle(request);
    }

    const id = `url:${request.url}`;

    const cachedResponse = this.cache.get(id);
    if (cachedResponse) {
      return of(cachedResponse.clone());
    }

    return next
      .handle(request)
      .pipe(
        filter((stateEvent): stateEvent is HttpResponse<T> => stateEvent instanceof HttpResponse),
        tap(stateEvent => this.cache.set(id, stateEvent.clone())),
        share()
      );
  }
}
