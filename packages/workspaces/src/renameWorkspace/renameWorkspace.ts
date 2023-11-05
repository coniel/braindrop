import {
  Fs,
  InvalidParameterError,
  InvalidPathError,
  PathConflictError,
} from '@minddrop/core';
import { Events } from '@minddrop/events';
import { getWorkspace } from '../getWorkspace';
import { Workspace } from '../types';
import { WorkspacesStore } from '../WorkspacesStore';

/**
 * Renames a workspace and its directory.
 * Dispatches a 'workspaces:workspace:rename' event.
 *
 * @param path - The workspace path.
 * @param name - The new workspace name.
 * @returns The updated workspace.
 *
 * @throws {InvalidPathError} - the workspace path does not exist.
 * @throws {PathConflictError} - the new name conflicts with an existing dir.
 */
export async function renameWorkspace(
  path: string,
  name: string,
): Promise<Workspace> {
  // Get the workspace
  const workspace = getWorkspace(path);
  // Generate the new workspace path
  const newPath = `${path.split('/').slice(0, -1).join('/')}/${name}`;

  // Ensure workspace exists
  if (!workspace) {
    throw new InvalidParameterError(`no such workspace: ${path}`);
  }

  // Ensure workspace dir exists
  if (!(await Fs.exists(path))) {
    throw new InvalidPathError(path);
  }

  // Ensure new name does not cause a conflict
  if (await Fs.exists(newPath)) {
    throw new PathConflictError(newPath);
  }

  // Update the workspace dir name
  await Fs.renameFile(path, newPath);

  // Generate the updated workspace object
  const updatedWorkspace = { ...workspace, path: newPath };

  // Remove old version of the workspace from store
  WorkspacesStore.getState().remove(path);
  // Add new version of the workspace to store
  WorkspacesStore.getState().add(updatedWorkspace);

  // Dispatch a 'workspaces:workspace:rename' event
  Events.dispatch('workspaces:workspace:rename', { oldPath: path, newPath });

  return updatedWorkspace;
}
