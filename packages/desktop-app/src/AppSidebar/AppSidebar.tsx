import { FC, useCallback } from 'react';
import { Sidebar, NavGroup, Toolbar, SecondaryNavItem } from '@minddrop/ui';
import { useTranslation } from '@minddrop/i18n';
import { AppUiState, useSidebarWidth } from '../AppUiState';
import { useWorkspaces } from '@minddrop/workspaces';
import { ThemeAppearanceSelect } from '../ThemeAppearanceSelect';
import './AppSidebar.css';

export const AppSidebar: FC = () => {
  const { t } = useTranslation();
  const initialWidth = useSidebarWidth();
  const workspaces = useWorkspaces();

  const handleResize = useCallback(
    (value: number) => AppUiState.set('sidebarWidth', value),
    [],
  );

  return (
    <Sidebar
      className="app-sidebar"
      data-testid="AppSidebar"
      initialWidth={initialWidth}
      onResized={handleResize}
    >
      <div data-tauri-drag-region className="app-drag-handle" />
      <NavGroup label="Main" />
      {workspaces.map((workspace) => (
        <NavGroup title={workspace.name}></NavGroup>
      ))}
      <NavGroup label="Secondary">
        <SecondaryNavItem icon="trash" label={t('trash')} />
      </NavGroup>
      <div className="flex" />
      <Toolbar className="bottom-toolbar">
        <ThemeAppearanceSelect />
      </Toolbar>
    </Sidebar>
  );
};
