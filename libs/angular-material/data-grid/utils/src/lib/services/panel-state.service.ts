import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, shareReplay } from 'rxjs';

@Injectable()
export class PanelStateService {

  private readonly panelOpen = new BehaviorSubject<boolean>(false);
  readonly panelOpen$ = this.panelOpen.asObservable().pipe(distinctUntilChanged(), shareReplay());

  /**
   * Set current state of filter panel.
   *
   * _true_ panel is open
   *
   * _false_ panel is closed
   * @param {boolean} state
   */
  setPanelState(state: boolean) {
    this.panelOpen.next(state);
  }
}
