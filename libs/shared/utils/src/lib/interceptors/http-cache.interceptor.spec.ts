import { fakeAsync, TestBed } from '@angular/core/testing';

import { HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
// noinspection ES6PreferShortImport
import { HttpCacheInterceptor } from "./http-cache.interceptor";

describe('HttpCacheInterceptor', () => {

  let client: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          {provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true}
        ]
      });
      client = TestBed.inject(HttpClient);
      httpMock = TestBed.inject(HttpTestingController);
    }
  );

  it('should be created', () => {
    const interceptor = TestBed.inject(HttpCacheInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should cache GET request',  fakeAsync(() => {
    const restApiUrl = '/test-api';
    const response = {msg: 'first response'};

    let serverHttpResult;
    client.get(restApiUrl).subscribe(res => serverHttpResult = res);

    const testRequest = httpMock.expectOne(restApiUrl);
    testRequest.flush(response);
    httpMock.verify();

    let cachedHttpResult;
    client.get(restApiUrl).subscribe(res => cachedHttpResult = res);

    expect(testRequest.request.method).toEqual('GET');
    expect(testRequest.request.url).toEqual(restApiUrl);
    expect(serverHttpResult).toEqual(response);
    expect(cachedHttpResult).toEqual(response);
  }));

  it('should not cache POST request',  fakeAsync(() => {
    const restApiUrl = '/test-api';
    const response = {msg: 'first response'};

    let serverHttpResult;
    client.post(restApiUrl, {}).subscribe(res => serverHttpResult = res);

    const testRequest = httpMock.expectOne(restApiUrl);
    testRequest.flush(response);
    httpMock.verify();

    let cachedHttpResult;
    client.post(restApiUrl, {}).subscribe(res => cachedHttpResult = res);

    expect(testRequest.request.method).toEqual('POST');
    expect(serverHttpResult).toEqual(response);
    expect(cachedHttpResult).toBeUndefined();
  }));
});
