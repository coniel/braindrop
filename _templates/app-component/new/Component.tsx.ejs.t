---
to: packages/app-ui/src/components/<%= name %>/<%= name %>.tsx
---
import React, { FC } from 'react';
import { mapPropsToClasses } from '@app-ui/utils';
import './<%= name %>.css';

export interface <%= name %>Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the <%= name %>.
   */
  children?: React.ReactNode;
}

export const <%= name %>: FC<<%= name %>Props> = ({ children, className, ...other }) => {
  return (
    <div className={mapPropsToClasses({ className }, '<%= h.toKebabCase(name) %>')} {...other}>
      {children}
    </div>
  );
};
