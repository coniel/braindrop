import React from 'react';
import { DROPS_TEST_DATA } from '@minddrop/drops';
import { act, fireEvent, render, renderHook } from '@minddrop/test-utils';
import { setup, cleanup, core } from '../test-utils';
import { getSelectedDrops } from '../getSelectedDrops';
import { useDraggableDrop } from './useDraggableDrop';
import { createDataInsertFromDataTransfer, mapById } from '@minddrop/utils';
import { selectDrops } from '../selectDrops';
import { setDraggedDrops } from '../setDraggedDrops';

const { textDrop1, textDrop2 } = DROPS_TEST_DATA;

const dragStartEvent = {
  dataTransfer: {
    setData: jest.fn(),
  },
};

const Drop = () => {
  const { onDragStart } = useDraggableDrop(textDrop1.id);

  return <div onDragStart={onDragStart} data-testid="drop" />;
};

describe('useDropDragging', () => {
  beforeEach(setup);

  afterEach(cleanup);

  describe('isBeingDragged', () => {
    it('is `false` when drop is not being dragged', () => {
      const { result } = renderHook(() => useDraggableDrop(textDrop1.id));

      expect(result.current.isBeingDragged).toBe(false);
    });

    it('is `true` when drop is being dragged', () => {
      const { result } = renderHook(() => useDraggableDrop(textDrop1.id));

      act(() => {
        setDraggedDrops(core, [textDrop1.id]);
      });

      expect(result.current.isBeingDragged).toBe(true);
    });
  });

  describe('onDragStart', () => {
    it('clears selected drops and selects the drop if not selected', () => {
      const { getByTestId } = render(<Drop />);

      act(() => {
        // Select another drop
        selectDrops(core, [textDrop2.id]);
      });

      act(() => {
        fireEvent.dragStart(getByTestId('drop'), dragStartEvent);
      });

      // Other drop should no longer be selected
      expect(getSelectedDrops()).toEqual(mapById([textDrop1]));
    });

    it('sets action and selected drops in data transfer', () => {
      const { getByTestId } = render(<Drop />);
      const dataTransfer = {
        types: [],
        data: {},
        getData: (key) => dataTransfer.data[key],
      };
      const event = {
        dataTransfer: {
          setData: (key, value) => {
            dataTransfer.data[key] = value;
            dataTransfer.types.push(key);
          },
        },
      };

      act(() => {
        // Select the drops
        selectDrops(core, [textDrop2.id, textDrop1.id]);
      });

      act(() => {
        // Drag textDrop1
        fireEvent.dragStart(getByTestId('drop'), event);
      });

      const dataInsert = createDataInsertFromDataTransfer(
        dataTransfer as unknown as DataTransfer,
      );

      // Should set action
      expect(dataInsert.action).toEqual('sort');
      // Should set drops
      expect(dataInsert.drops.includes(textDrop1.id)).toBeTruthy();
      expect(dataInsert.drops.includes(textDrop2.id)).toBeTruthy();
    });
  });
});
