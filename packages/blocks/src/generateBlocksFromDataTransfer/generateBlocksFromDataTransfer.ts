import { toMindDropDataTransfer } from '@minddrop/utils';
import { Fs } from '@minddrop/file-system';
import { Block } from '../types';
import {
  generateTextBlock,
  generateLinkBlock,
  generateFileBlock,
} from '../generateBlock';

/**
 * Generates blocks from a data transfer object.
 * Files are written to the file system in the provided parent path.
 *
 * @param dataTransfer - The data transfer object to generate blocks from.
 * @param parentPath - The path to the parent directory in which to write files.
 * @returns The generated blocks.
 */
export async function generateBlocksFromDataTransfer(
  dataTransfer: DataTransfer,
  parentPath: string,
): Promise<Block[]> {
  const transfer = toMindDropDataTransfer(dataTransfer);

  // Generate file blocks if files are present.
  // Ignores .webloc files created by Safari when dragging a link.
  if ('files' in transfer) {
    // Get non .webloc files
    const files =
      transfer.files?.filter((file) => !file.name.endsWith('.webloc')) || [];

    if (files.length) {
      return await Promise.all(
        transfer.files?.map(async (file) =>
          createBlockFromFile(file, parentPath),
        ) || [],
      );
    }
  }

  // Generate a link block if a uri-list is present
  if (transfer.types.includes('text/uri-list')) {
    const url = transfer.data['text/uri-list'];

    return [generateLinkBlock(url)];
  }

  // Generate a text block if plain text is present
  if (transfer.types.includes('text/plain')) {
    const text = transfer.data['text/plain'];

    return [generateTextBlock(text)];
  }

  return [];
}

async function createBlockFromFile(
  file: File,
  parentPath: string,
): Promise<Block> {
  const { path } = await Fs.incrementalPath(
    Fs.concatPath(parentPath, file.name),
  );

  await Fs.writeBinaryFile(path, file);

  Fs.fileNameFromPath(path);

  return generateFileBlock(file, Fs.fileNameFromPath(path));
}
