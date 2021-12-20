import createStore from 'zustand';
import { PersistentStore } from '../types';

export const usePersistentStore = createStore<PersistentStore>((set) => ({
  global: {},

  local: {},

  load: (scope, data) =>
    set((state) => ({
      [scope as 'global']: {
        ...state[scope],
        ...data,
      },
    })),

  set: (scope, namespace, key, value) =>
    set((state) => ({
      [scope as 'global']: {
        ...state[scope],
        [namespace]: {
          ...(state[scope][namespace] || {}),
          [key]: value,
        },
      },
    })),

  delete: (scope, namespace, key) =>
    set((state) => {
      const data = state[scope][namespace] || {};

      delete data[key];

      return {
        [scope as 'global']: {
          ...state[scope],
          [namespace]: data,
        },
      };
    }),

  clear: (scope, namespace) =>
    set((state) => {
      const { global, local } = state;

      if (scope === 'global') {
        delete global[namespace];
      } else {
        delete local[namespace];
      }

      return {
        local,
      };
    }),

  clearChache: (scope) => set(() => ({ [scope as 'global']: {} })),
}));
