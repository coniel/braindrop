import { contains } from '@minddrop/utils';
import { Drop } from '../types';
import { getDrop } from '../getDrop';
import { setup, cleanup, core, textDrop1 } from '../test-utils';
import { addParentsToDrop } from './addParentsToDrop';

describe('addParentsToDrop', () => {
  beforeEach(setup);

  afterEach(cleanup);

  it('adds the parents to the drop', () => {
    // Add parents to the drop
    addParentsToDrop(core, textDrop1.id, [
      { type: 'topic', id: 'parent-1' },
      { type: 'topic', id: 'parent-2' },
    ]);

    // Get the updated drop
    const drop = getDrop(textDrop1.id);

    // Should have new parents
    expect(
      contains(drop.parents, [
        { type: 'topic', id: 'parent-1' },
        { type: 'topic', id: 'parent-2' },
      ]),
    ).toBeTruthy();
  });

  it('returns the updated drop', () => {
    // Add parents to the drop
    const result = addParentsToDrop(core, textDrop1.id, [
      { type: 'topic', id: 'parent' },
    ]);

    // Get the updated drop
    const drop = getDrop(textDrop1.id);

    // Should be the updated drop
    expect(drop).toEqual(result);
  });

  it('dispatches a `drops:add-parents` event', (done) => {
    let drop: Drop;

    core.addEventListener('drops:add-parents', (payload) => {
      // Payload data should contain updated drop
      expect(payload.data.drop).toEqual(drop);
      // Payload data should contain added parent references
      expect(payload.data.parents).toEqual([{ type: 'topic', id: 'parent' }]);
      done();
    });

    // Add parents to drop
    drop = addParentsToDrop(core, textDrop1.id, [
      { type: 'topic', id: 'parent' },
    ]);
  });
});
