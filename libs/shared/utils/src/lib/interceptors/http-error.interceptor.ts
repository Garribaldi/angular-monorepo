import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { ErrorMessage } from './http-error-message.model';


@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor<T> implements HttpInterceptor {

  intercept(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage: ErrorMessage = {};
        errorMessage.title = 'Server-Error';
        errorMessage.text = error.message;
        errorMessage.innerMessage = error.error?.message;
        errorMessage.status = error.status;
        errorMessage.statusText = error.statusText;
        errorMessage.path = error.error?.path;
        errorMessage.url = error.url ?? undefined;
        throw errorMessage;
      })
    );
  }
}
