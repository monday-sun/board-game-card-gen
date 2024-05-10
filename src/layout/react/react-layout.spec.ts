import { of } from 'rxjs';
import { Paths } from '../../file/file';
import { NeedsLayout } from '../../templates';
import { factory } from './react-layout';

describe('ReactLayout', () => {
  it('should render all requested layouts', (done) => {
    const testSubject = factory({} as any, {
      needsLayout$: of(
        ...[
          <NeedsLayout>{
            templatePaths: <Paths>{
              filePath: './test/test-component',
              relativePath: './test/test-component',
            },
            card: {
              message: 'Goodbye!',
            } as any,
          },
          <NeedsLayout>{
            templatePaths: <Paths>{
              filePath: './test/test-component',
              relativePath: './test/test-component',
            },
            card: {
              message: 'Hello!',
            } as any,
          },
        ],
      ),
    });

    const expectedLayouts = [
      {
        templatePaths: <Paths>{
          filePath: './test/test-component',
          relativePath: './test/test-component',
        },
        card: {
          message: 'Goodbye!',
        },
        layout: '<div>Goodbye!</div>',
        format: 'html',
      },
      {
        templatePaths: <Paths>{
          filePath: './test/test-component',
          relativePath: './test/test-component',
        },
        card: {
          message: 'Hello!',
        },
        layout: '<div>Hello!</div>',
        format: 'html',
      },
    ];

    testSubject.layout$.subscribe((layout) => {
      expect(layout).toEqual(expectedLayouts.shift());
      if (expectedLayouts.length === 0) {
        done();
      }
    });
  });
});