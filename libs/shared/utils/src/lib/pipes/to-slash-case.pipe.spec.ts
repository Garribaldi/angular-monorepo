import { ToSlashCasePipe } from './to-slash-case.pipe';

describe('ToSlashCasePipe', () => {

  let pipe: ToSlashCasePipe;

  beforeEach(() => pipe = new ToSlashCasePipe());


  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  test('convert "A" to "-a"', () => {
    const result = pipe.transform('A');

    expect(result).toEqual('-a');
  })
});
