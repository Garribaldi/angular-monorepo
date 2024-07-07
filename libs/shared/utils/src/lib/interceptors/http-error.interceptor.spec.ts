import { fakeAsync, TestBed } from '@angular/core/testing';
// noinspection ES6PreferShortImport
import { HttpErrorInterceptor } from './http-error.interceptor';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ErrorInterceptor', () => {

  let client: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}
        ]
      });
      client = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
    }
  );

  it('should be created', () => {
    const interceptor = TestBed.inject(HttpErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should catch http error', fakeAsync(() => {
    const restApiUrl = '/test-api';
    let response;
    let responseError = {} as  HttpErrorResponse;

    client.get(restApiUrl).subscribe({
      next: res => response = res,
      error: err => responseError = err
    });

    const error = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      url: restApiUrl
    });
    const testRequest = httpMock.expectOne(restApiUrl);
    testRequest.flush('error', error);
    httpMock.verify();

    expect(testRequest.request.method).toEqual('GET');
    expect(testRequest.request.url).toEqual(restApiUrl);
    expect(response).toBeUndefined();
    expect(responseError?.status).toEqual(404);
  }));
});
