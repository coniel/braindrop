import { watchImmediate, RawEvent } from 'tauri-plugin-fs-watch-api';
import { appConfigDir } from '@tauri-apps/api/path';
import { Workspaces, WorkspacesConfigFileName } from '@minddrop/workspaces';
import { throttle } from '@minddrop/utils';
import { AppUiState } from '../AppUiState';

export async function watchAppConfigFiles() {
  // Get the app configs dir
  const dir = await appConfigDir();
  const id = Math.random();

  // Watch the app configs directory
  return watchImmediate(`${dir}`, (event) => handleWatcherEvent(id, event));
}

const handleWorkspacesConfigEventThrottled = throttle(
  handleWorkspacesConfigEvent,
  100,
);

function handleWatcherEvent(id: number, event: RawEvent) {
  if (
    event.paths.some((eventPath) =>
      eventPath.includes(WorkspacesConfigFileName),
    )
  ) {
    handleWorkspacesConfigEventThrottled(id);
  }
}

async function handleWorkspacesConfigEvent(id: number) {
  await Workspaces.load();
  console.log('ran watcher', id);

  if (Workspaces.hasValidWorkspace() && !AppUiState.get('view')) {
    AppUiState.set('view', 'home');
  }
}
