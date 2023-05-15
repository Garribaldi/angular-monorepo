import { ToSlashCasePipe } from './to-slash-case.pipe';

describe('ToSlashCasePipe', () => {
  it('create an instance', () => {
    const pipe = new ToSlashCasePipe();
    expect(pipe).toBeTruthy();
  });
});
