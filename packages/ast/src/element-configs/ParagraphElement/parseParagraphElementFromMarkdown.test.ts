import { afterEach, describe, expect, it, vi } from 'vitest';
import { generateElement } from '../../utils';
import { ParagraphElement } from './ParagraphElement.types';
import { parseParagraphElementFromMarkdown } from './parseParagraphElementFromMarkdown';

const paragraphElement = generateElement<ParagraphElement>('paragraph', {
  children: [{ text: 'Paragraph' }],
});
const consume = vi.fn();
const nextLine = vi.fn();

describe('parseParagraphElementFromMarkdown', () => {
  afterEach(() => {
    consume.mockClear();
  });

  it('parses the line into a paragraph', () => {
    expect(
      parseParagraphElementFromMarkdown('Paragraph', consume, nextLine),
    ).toEqual(paragraphElement);
  });

  it('consumes the line', () => {
    parseParagraphElementFromMarkdown('Paragraph', consume, nextLine);

    expect(consume).toHaveBeenCalledOnce();
  });
});
