import path from 'path';
import { cwd } from 'process';
import { Observable } from 'rxjs';
import { Card } from '../cards';
import { Paths } from '../file/file';
import { Templates } from '../templates';
import { Arguements } from '../types';

export type LayoutResult = {
  templatePaths: Paths;
  card: Card;
  layout: string;
  format: string;
};

export interface Layout {
  layout$: Observable<LayoutResult>;
}

export type LayoutFactory = (args: Arguements, templates: Templates) => Layout;

export namespace Layout {
  type LayoutRenderTypes = { react: string };

  const layoutRenderTypes: LayoutRenderTypes = {
    react: './react/react-layout',
  };

  export const findFactory = (args: Arguements): Promise<LayoutFactory> => {
    const type = args.layout;
    const importPath =
      type in layoutRenderTypes
        ? layoutRenderTypes[type as keyof LayoutRenderTypes]
        : path.join(cwd(), type);
    console.log('Rendering layouts with', importPath);
    return import(importPath).then(({ factory }) => factory);
  };
}