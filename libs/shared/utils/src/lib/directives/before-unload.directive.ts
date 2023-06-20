import { Directive, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subject, takeUntil } from "rxjs";

/**
 * Prevents from leaving a page and losing unsubmitted data.
 * If you touched a page and close the tab / refresh the page,
 * a (system) dialog appears to assure that you know the consequences
 * of leaving the poge.
 */
@Directive({
  selector: '[localSharedBeforeUnload]'
})
export class BeforeUnloadDirective implements OnInit, OnDestroy {

  private readonly windowUnload$ = fromEvent(window, 'beforeunload');
  private readonly unsubscribe = new Subject<void>();

  ngOnInit() {
    this.windowUnload$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((ev: BeforeUnloadEvent) => {
        ev.preventDefault();
        ev.returnValue = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
