import { getRichTextElements } from '../getRichTextElements';
import { toPlainText } from '../toPlainText';
import { RichTextDocumentsApi } from '../types/RichTextDocumentsApi.types';

export const RichTextDocuments: RichTextDocumentsApi = {
  toPlainText: (document) => {
    // Get the document's children
    const children = getRichTextElements(document.children);

    // Turn the children map into an array ordered according
    // to the order of the document's children
    const orderedChildren = document.children.map(
      (childId) => children[childId],
    );

    // Return the children as plain text
    return toPlainText(orderedChildren);
  },
};
