import { renderHook, act } from '@minddrop/test-utils';
import { VIEWS_TEST_DATA } from '@minddrop/views';
import { UiExtensionConfig } from '../types';
import { useAppStore } from './useAppStore';

const { viewInstance1 } = VIEWS_TEST_DATA;

const uiExtension: UiExtensionConfig = {
  type: 'config',
  location: 'Sidebar:Toolbar:Item',
  id: 'id',
  source: 'extension-id',
  element: {
    type: 'icon-button',
    icon: 'add',
    label: 'Add',
    onClick: jest.fn(),
  },
};
const uiExtension2 = {
  ...uiExtension,
  id: 'id-2',
  source: 'extension-id',
  location: 'Sidebar:Toolbar:Below',
};
const uiExtension3 = {
  ...uiExtension,
  id: 'id-3',
  source: 'extension-id-2',
};

describe('useAppStore', () => {
  afterEach(() => {
    const { result } = renderHook(() => useAppStore((state) => state));
    act(() => {
      result.current.clear();
    });
  });

  it('sets the view', () => {
    const { result } = renderHook(() => useAppStore((state) => state));

    act(() => {
      result.current.setView('my-view');
    });

    expect(result.current.view).toBe('my-view');
  });

  it('sets the view instance', () => {
    const { result } = renderHook(() => useAppStore((state) => state));

    act(() => {
      result.current.setViewInstance(viewInstance1);
    });

    expect(result.current.viewInstance).toBe(viewInstance1);
  });

  it('clears the state', () => {
    const { result } = renderHook(() => useAppStore((state) => state));

    act(() => {
      result.current.addUiExtension(uiExtension);
      result.current.addUiExtension(uiExtension);
      result.current.addSelectedDrops(['drop-id']);
      result.current.setView('some-view');
      result.current.setViewInstance(viewInstance1);
      result.current.clear();
    });

    expect(result.current.uiExtensions.length).toBe(0);
    expect(result.current.selectedDrops.length).toBe(0);
    expect(result.current.view).toBe('app:home');
    expect(result.current.viewInstance).toBeNull();
  });

  describe('UI extensions', () => {
    it('add a UI extension', () => {
      const { result } = renderHook(() => useAppStore((state) => state));

      act(() => {
        result.current.addUiExtension(uiExtension);
      });

      expect(result.current.uiExtensions.length).toBe(1);
    });

    it('removes a UI extension', () => {
      const { result } = renderHook(() => useAppStore((state) => state));

      act(() => {
        result.current.addUiExtension(uiExtension);
        result.current.addUiExtension({
          ...uiExtension,
          location: 'Sidebar:Toolbar:Above',
        });
        result.current.removeUiExtension(
          uiExtension.location,
          uiExtension.element,
        );
      });

      expect(result.current.uiExtensions.length).toBe(1);
    });

    it('removes all UI extensions for a source at a location', () => {
      const { result } = renderHook(() => useAppStore((state) => state));

      act(() => {
        result.current.addUiExtension(uiExtension);
        result.current.addUiExtension(uiExtension2);
        result.current.addUiExtension(uiExtension3);
        result.current.removeAllUiExtensions(
          'extension-id',
          'Sidebar:Toolbar:Item',
        );
      });

      expect(result.current.uiExtensions.length).toBe(2);
    });

    it('removes all UI extensions for a source', () => {
      const { result } = renderHook(() => useAppStore((state) => state));

      act(() => {
        result.current.addUiExtension(uiExtension);
        result.current.addUiExtension(uiExtension2);
        result.current.addUiExtension(uiExtension3);
        result.current.removeAllUiExtensions('extension-id');
      });

      expect(result.current.uiExtensions.length).toBe(1);
    });
  });

  describe('selected drops', () => {
    it('adds selected drops', () => {
      useAppStore.getState().addSelectedDrops(['drop-id']);

      expect(useAppStore.getState().selectedDrops).toEqual(['drop-id']);
    });

    it('removes selected drops', () => {
      useAppStore.getState().addSelectedDrops(['drop-id', 'drop2-id']);
      useAppStore.getState().removeSelectedDrops(['drop-id']);

      expect(useAppStore.getState().selectedDrops).toEqual(['drop2-id']);
    });

    it('clears selected drops', () => {
      useAppStore.getState().addSelectedDrops(['drop-id', 'drop2-id']);
      useAppStore.getState().clearSelectedDrops();

      expect(useAppStore.getState().selectedDrops).toEqual([]);
    });
  });
});
