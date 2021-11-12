import React, { useState } from 'react';
import { PrimaryNavItem } from '@minddrop/ui';
import { Drop, Search, Settings } from '@minddrop/icons';

export const PrimaryNavItemDemo = () => {
  const [active, setActive] = useState('daily-drops');

  return (
    <div
      style={{
        width: 260,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 2,
        padding: '12px 6px',
        borderRadius: 'var(--radiusMd)',
        backgroundColor: 'var(--bgApp)',
      }}
    >
      <PrimaryNavItem
        label="Daily drops"
        icon={<Drop />}
        active={active === 'daily-drops'}
        onClick={() => setActive('daily-drops')}
      />
      <PrimaryNavItem
        label="Search"
        icon={<Search />}
        active={active === 'search'}
        onClick={() => setActive('search')}
      />
      <PrimaryNavItem
        label="Settings"
        icon={<Settings />}
        active={active === 'settings'}
        onClick={() => setActive('settings')}
      />
    </div>
  );
};

export default PrimaryNavItemDemo;
