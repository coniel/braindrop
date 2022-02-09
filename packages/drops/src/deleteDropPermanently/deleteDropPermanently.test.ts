import { act, renderHook } from '@minddrop/test-utils';
import { deleteDropPermanently } from './deleteDropPermanently';
import { Drop } from '../types';
import { createDrop } from '../createDrop';
import { useAllDrops } from '../useAllDrops';
import { cleanup, core, setup } from '../test-utils';

describe('deleteDrop', () => {
  beforeEach(setup);

  afterEach(cleanup);

  it('returns the deleted drop', () => {
    let drop: Drop;
    let deletedDrop: Drop;

    act(() => {
      drop = createDrop(core, { type: 'text' });
      deletedDrop = deleteDropPermanently(core, drop.id);
    });

    expect(deletedDrop).toEqual(drop);
  });

  it('removes the drop from the store', () => {
    const { result } = renderHook(() => useAllDrops());
    let drop: Drop;

    act(() => {
      drop = createDrop(core, { type: 'text' });
      deleteDropPermanently(core, drop.id);
    });

    expect(result.current[drop.id]).not.toBeDefined();
  });

  it("dispatches a 'drops:delete-permanently' event", () => {
    let drop: Drop;

    function callback(payload) {
      expect(payload.data).toEqual(drop);
    }

    core.addEventListener('drops:delete-permanently', callback);

    act(() => {
      drop = createDrop(core, { type: 'text' });
      deleteDropPermanently(core, drop.id);
    });
  });
});
