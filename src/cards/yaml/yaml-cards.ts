import { Observable, map } from 'rxjs';
import * as yaml from 'yaml';
import { Card, CardsFactory } from '..';
import { Deck } from '../../decks';
import { File } from '../../file/file';
import { FileContent } from '../../file/file-content';
import { Arguments } from '../../types';

export const factory: CardsFactory = (
  args: Arguments,
  deck: Deck,
): Observable<Card[]> => {
  const cardList = File.factory(args, deck.list);
  const cardListContent = FileContent.factory(args, cardList);
  return cardListContent.pipe(
    map(({ content }) => yaml.parse(content)),
    map(({ cards }) => cards),
    map((cards) =>
      Object.keys(cards).map((key) => ({ name: key, ...cards[key] })),
    ),
  );
};
