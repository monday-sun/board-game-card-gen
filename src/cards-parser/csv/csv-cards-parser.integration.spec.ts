import { of } from 'rxjs';
import { ContentProvider } from '../../types';
import { createCardsParser } from './csv-cards-parser';

describe('CSVCardsParser', () => {
  it('parses cards from a CSV file', (done) => {
    const csvContent = `name,count,frontTemplate,backTemplate,customOption
Card1,1,Front1,Back1,Unknown1
Card2,2,Front2,Back2,Unknown2`;
    const fileProvider: ContentProvider = {
      content: () => of(csvContent),
    };
    const testSubject = createCardsParser({} as any, fileProvider);

    const expectedCards = [
      {
        name: 'Card1',
        count: '1',
        frontTemplate: 'Front1',
        backTemplate: 'Back1',
        customOption: 'Unknown1',
      },
      {
        name: 'Card2',
        count: '2',
        frontTemplate: 'Front2',
        backTemplate: 'Back2',
        customOption: 'Unknown2',
      },
    ];

    testSubject.cards$.subscribe((cards) => {
      expect(cards).toEqual(expectedCards);
      done();
    });
  });
});
