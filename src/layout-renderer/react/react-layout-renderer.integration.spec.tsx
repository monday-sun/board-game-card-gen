import { of } from 'rxjs';
import { factory } from './react-layout-renderer';

describe('ReactLayout', () => {
  it('should render a React component to static HTML with properties', (done) => {
    const testSubject = factory(
      {} as any,
      of({
        templatePath: './test-component',
        card: {
          message: 'Hello, world!',
        } as any,
      }),
    );

    testSubject.layout$.subscribe((layout) => {
      expect(layout).toEqual({
        layout: '<div>Hello, world!</div>',
        card: {
          message: 'Hello, world!',
        },
      });
      done();
    });
  });
});
