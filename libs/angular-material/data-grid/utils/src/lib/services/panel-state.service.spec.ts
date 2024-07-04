import { TestBed } from '@angular/core/testing';
import { PanelStateService } from './panel-state.service';
import { firstValueFrom } from 'rxjs';

describe('PanelStateService', () => {
  let service: PanelStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PanelStateService
      ]
    });
    jest.clearAllMocks();

    service = TestBed.inject(PanelStateService);
  });

  test('create service', () => {
    expect(service).toBeTruthy();
  });

  describe('setPanelState()', () => {

    test('open panel', async () => {
      service.setPanelState(true);

      const result = await firstValueFrom(service.panelOpen$);

      expect(result).toBeTruthy();
    });

    test('closed panel', async () => {
      service.setPanelState(false);

      const result = await firstValueFrom(service.panelOpen$);

      expect(result).toBeFalsy();
    });
  });
});
