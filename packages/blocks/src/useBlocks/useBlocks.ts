import { BlocksStore as useBlocksStore } from '../BlocksStore';
import { Block } from '../types';

/**
 * Returns a list of blocks by their IDs.
 *
 * @param ids - The block IDs to retrieve.
 * @returns An array of blocks.
 */
export function useBlocks(ids: string[]): Block[] {
  // Get all blocks
  const { blocks } = useBlocksStore();

  // Get matching blocks
  return ids.map((id) => blocks[id]).filter(Boolean);
}
