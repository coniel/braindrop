import { Core } from '@minddrop/core';
import { FieldValue } from '@minddrop/utils';
import { Drop, DropParentReference } from '../types';
import { updateDrop } from '../updateDrop';

/**
 * Removes parent references from a drop and dispatches a
 * `drops:remove-parents` event.
 *
 * @param core A MindDrop core instance.
 * @param dropId The ID of the drop from which to remove the parents.
 * @param parentReferences The parent references to remove.
 */
export function removeParentsFromDrop(
  core: Core,
  dropId: string,
  parentReferences: DropParentReference[],
): Drop {
  // Remove parent references from the drop
  const drop = updateDrop(core, dropId, {
    parents: FieldValue.arrayFilter<DropParentReference>(
      (reference) =>
        !parentReferences.find(
          (remove) =>
            remove.type === reference.type && remove.id === reference.id,
        ),
    ),
  });

  // Dispatch 'drops:remove-parents' event
  core.dispatch('drops:remove-parents', { drop, parents: parentReferences });

  return drop;
}
