import { LayoutRenderer } from '../../types';
import { createImageRenderer } from './node-individual-card-image-renderer';

jest.mock('node-html-to-image', () =>
  jest.fn().mockImplementation(({ output }) => Promise.resolve(output)),
);

describe('NodeIndividualCardImageRenderer', () => {
  let layoutRenderer: LayoutRenderer;

  beforeEach(() => {
    layoutRenderer = {
      toHTML: jest.fn((templatePath) => Promise.resolve(templatePath)),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create images for each card', async () => {
    const cardInfos = [
      {
        count: '1',
        name: 'Card 1',
        frontTemplate: 'Front',
        backTemplate: 'Back',
      },
      {
        count: '1',
        name: 'Card 2',
        frontTemplate: 'Front',
        backTemplate: 'Back',
      },
    ];
    const testSubject = createImageRenderer('output');
    const images = await testSubject.toImages(cardInfos, layoutRenderer);
    expect(images).toEqual([
      'output/card-1-front.png',
      'output/card-1-back.png',
      'output/card-2-front.png',
      'output/card-2-back.png',
    ]);
  });

  it('should create images for each copy of a card', async () => {
    const cardInfos = [
      {
        count: '2',
        name: 'Card 1',
        frontTemplate: 'Front',
        backTemplate: 'Back',
      },
    ];
    const testSubject = createImageRenderer('output-path');
    const images = await testSubject.toImages(cardInfos, layoutRenderer);
    expect(images).toEqual([
      'output-path/card-1-front-1.png',
      'output-path/card-1-front-2.png',
      'output-path/card-1-back-1.png',
      'output-path/card-1-back-2.png',
    ]);
  });
});