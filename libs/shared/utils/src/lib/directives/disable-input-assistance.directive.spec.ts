import { DisableInputAssistanceDirective } from './disable-input-assistance.directive';
import { ElementRef } from "@angular/core";

describe('DisableInputAssistanceDirective', () => {
  it('should create an instance', () => {
    const elementRef = {} as ElementRef;
    const directive = new DisableInputAssistanceDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
