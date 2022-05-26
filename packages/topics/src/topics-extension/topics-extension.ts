import { Core } from '@minddrop/core';
import { Drops } from '@minddrop/drops';
import { Resources } from '@minddrop/resources';
import { TopicsResource } from '../TopicsResource';
import { removeDropsFromTopic } from '../removeDropsFromTopic';
import { useTopicsStore } from '../useTopicsStore';

export function onRun(core: Core) {
  // Register the 'topics:topic' resource
  Resources.register(core, TopicsResource);

  // Listen for drop deletions and remove deleted drops from topics
  Drops.addEventListener(core, 'drops:drop:delete', ({ data }) => {
    data.parents
      .filter((parent) => parent.resource === 'topics:topic')
      .forEach(({ id }) => {
        removeDropsFromTopic(core, id, [data.id]);
      });
  });
}

export function onDisable(core: Core) {
  // Clear the store
  useTopicsStore.getState().clear();
  // Remove event listeners
  core.removeAllEventListeners();
}
