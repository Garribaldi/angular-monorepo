import { Directive, OnInit } from '@angular/core';
import { fromEvent } from "rxjs";

@Directive({
  selector: '[localSharedBeforeUnload]'
})
export class BeforeUnloadDirective implements OnInit{

  private readonly windowUnload$ = fromEvent(window, 'beforeunload');

  ngOnInit() {
    console.log('directive');

    this.windowUnload$.subscribe((ev: BeforeUnloadEvent) => {
      ev.preventDefault();
      ev.returnValue = false;
      console.log(ev);
    });
  }

}
