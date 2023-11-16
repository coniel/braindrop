import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { initializeMockFileSystem } from '@minddrop/file-system';
import { loadConfigs } from './loadConfigs';
import { PersistentConfigsStore } from '../PersistentConfigsStore';
import { configsFileDescriptor } from '../../test-utils';

const testConfigs = {
  'test-config-1': {
    foo: 'bar',
  },
  'test-config-2': {
    bar: 'foo',
  },
};

const MockFs = initializeMockFileSystem([
  // configs.json file
  configsFileDescriptor,
]);

describe('loadConfigs', () => {
  beforeEach(() => {
    // Reset mock file system
    MockFs.reset();
  });

  afterEach(() => {
    PersistentConfigsStore.clear();
  });

  it('does nothing if the configs.json file does not exist', async () => {
    // Pretend config file does not exist
    MockFs.clear();

    // Load the configs
    await loadConfigs();

    // Configs store should be empty
    expect(PersistentConfigsStore.getAll()).toEqual({});
  });

  it('loads the configs from app data "configs.json" file', async () => {
    // Load the configs
    await loadConfigs();

    // Should load the configs into the store
    expect(PersistentConfigsStore.getAll()).toEqual({
      'test-config-1': {
        id: 'test-config-1',
        values: testConfigs['test-config-1'],
      },
      'test-config-2': {
        id: 'test-config-2',
        values: testConfigs['test-config-2'],
      },
    });
  });

  it('does nothing if configs.json file cannot be parsed', async () => {
    // Add an a configs.json file with invalid content
    MockFs.setFiles([{ ...configsFileDescriptor, textContent: 'foo' }]);

    // Load the configs
    await loadConfigs();

    // Should load the configs into the store
    expect(PersistentConfigsStore.getAll()).toEqual({});
  });
});
