import { initializeCore } from '@minddrop/core';
import { act, cleanup as cleanupRender } from '@minddrop/test-utils';
import {
  RichTextDocuments,
  RichTextElements,
  RICH_TEXT_TEST_DATA,
} from '@minddrop/rich-text';

const { richTextElementConfigs, richTextElements, richTextDocuments } =
  RICH_TEXT_TEST_DATA;

export const core = initializeCore({
  appId: 'app',
  extensionId: 'minddrop/text-drop',
});

export function setup() {
  act(() => {
    // Register element types
    richTextElementConfigs.forEach((config) => {
      RichTextElements.register(core, config);
    });

    // Load rich text elements
    RichTextElements.load(core, richTextElements);

    // Load rich text documents
    RichTextDocuments.load(core, richTextDocuments);
  });
}

export function cleanup() {
  act(() => {
    // Clear registered rich text element types
    RichTextElements.clearRegistered();

    // Clear rich text elements
    RichTextElements.clearElements();

    // Clear rich text documents
    RichTextDocuments.clear();

    // Clear all mock functions
    jest.clearAllMocks();

    // Clear the rich text editor store
    // useRichTextEditorStore.getState().clear();
  });

  // React testing library cleanup
  cleanupRender();
}
