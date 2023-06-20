import { BaseChartDirective } from './base-chart.directive';
import { ElementRef } from "@angular/core";
import { MockService } from "ng-mocks";
import { ChartsHelperService } from "./charts-helper.service";

describe('BaseChartDirective', () => {

  it('should create an instance', () => {
    const elementRef = {} as ElementRef;
    const utils = MockService(ChartsHelperService);
    const directive = new BaseChartDirective(elementRef, utils);
    expect(directive).toBeTruthy();
  });
});
