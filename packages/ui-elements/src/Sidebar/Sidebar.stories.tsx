import React, { useState } from 'react';
import { DocumentNavItem } from '../DocumentNavItem';
import { IconButton } from '../IconButton';
import { NavGroup } from '../NavGroup';
import { PrimaryNavItem } from '../PrimaryNavItem';
import { SecondaryNavItem } from '../SecondaryNavItem';
import { Toolbar } from '../Toolbar';
import { Sidebar } from './Sidebar';

export default {
  title: 'ui/Sidebar',
  component: Sidebar,
};

export const Default: React.FC = () => {
  const [width, setWidth] = useState(300);
  const [active, setActive] = useState('');

  return (
    <div
      style={{ width: '100%', height: '100%', marginTop: -16, marginLeft: -16 }}
    >
      <Sidebar
        initialWidth={width}
        onResized={setWidth}
        style={{ display: 'flex', flexDirection: 'column', rowGap: 36 }}
      >
        <div />
        <NavGroup label="Main">
          <PrimaryNavItem
            label="Daily drops"
            icon="droplet"
            active={active === 'daily-drops'}
            onClick={() => setActive('daily-drops')}
          />
          <PrimaryNavItem
            label="Search"
            icon="search"
            active={active === 'search'}
            onClick={() => setActive('search')}
          />
        </NavGroup>
        <NavGroup title="Documents">
          <DocumentNavItem
            label="Sailing"
            active={active === 'sailing'}
            onClick={() => setActive('sailing')}
          >
            <DocumentNavItem
              label="Sailboats"
              active={active === 'sailboats'}
              onClick={() => setActive('sailboats')}
            />
            <DocumentNavItem
              active={active === 'sails'}
              label="Sails"
              onClick={() => setActive('sails')}
            />
            <DocumentNavItem
              label="Navigation"
              active={active === 'navigation'}
              onClick={() => setActive('navigation')}
            >
              <DocumentNavItem
                label="Coastal navigation"
                active={active === 'coastal-navigation'}
                onClick={() => setActive('coastal-navigation')}
              />
              <DocumentNavItem
                label="Offshore navigation"
                active={active === 'offshore-navigation'}
                onClick={() => setActive('offshore-navigation')}
              />
            </DocumentNavItem>
            <DocumentNavItem
              label="Anchoring"
              active={active === 'anchoring'}
              onClick={() => setActive('anchoring')}
            />
          </DocumentNavItem>
          <SecondaryNavItem label="Add document" icon="plus" />
        </NavGroup>
        <NavGroup label="Utilities">
          <SecondaryNavItem
            label="Extensions"
            icon="cube"
            active={active === 'extensions'}
            onClick={() => setActive('extensions')}
          />
          <SecondaryNavItem
            label="Archive"
            icon="archive"
            active={active === 'archive'}
            onClick={() => setActive('archive')}
          />
          <SecondaryNavItem
            label="Trash"
            icon="trash"
            active={active === 'trash'}
            onClick={() => setActive('trash')}
          />
        </NavGroup>
        <div style={{ flex: 1 }} />
        <Toolbar style={{ padding: '8px 16px' }}>
          <IconButton icon="cloud-upload" label="Sync" color="light" />
          <IconButton icon="settings" label="Settings" color="light" />
          <IconButton icon="copy" label="New window" color="light" />
        </Toolbar>
      </Sidebar>
    </div>
  );
};
