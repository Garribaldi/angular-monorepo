import { TestBed } from "@angular/core/testing";
import { MockProvider, MockService } from "ng-mocks";
import { DemoTitleStrategy } from "./demo-title-strategy";
import { Title } from "@angular/platform-browser";
import { RouterStateSnapshot } from "@angular/router";

describe('DemoTitleStrategy', () => {

  let service: DemoTitleStrategy;
  let title: Title;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(Title),
        DemoTitleStrategy
      ]
    });
    service = TestBed.inject(DemoTitleStrategy);
    title = TestBed.inject(Title);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Title', () => {

    const testTitle = 'Test title';

    let spyOnSetTitle: jest.SpyInstance;
    let spyOnBuildTitle: jest.SpyInstance;

    beforeEach(() => {
      spyOnSetTitle = jest.spyOn(title, 'setTitle');
      spyOnBuildTitle = jest.spyOn(service, 'buildTitle').mockReturnValue(testTitle);
    });

    it('should set title', () => {
      const routerState = MockService(RouterStateSnapshot);

      service.updateTitle(routerState);

      expect(spyOnBuildTitle).toHaveBeenCalledWith(routerState);
      expect(spyOnSetTitle).toHaveBeenCalledWith(`Local demo app - ${testTitle}`);
    });
  })
});
