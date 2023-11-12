import { UserIconType } from '@minddrop/icons';
import { Workspaces } from '@minddrop/workspaces';

/**
 * Clears a workspace's icon, resetting it to the default
 * icon.
 *
 * @param path - The workspace path.
 */
export async function clearWorkspaceIcon(path: string): Promise<void> {
  Workspaces.setIcon(path, { type: UserIconType.Default });
}
