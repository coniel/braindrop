/**
 * This package re-exports types from other packages to make them
 * available to extenion developers.
 */
export type * from '@minddrop/ast';
export type * from '@minddrop/documents';
// TODO: fix type conflicts with Ast
// export type * from '@minddrop/editor';
export type * from '@minddrop/events';
export type * from '@minddrop/file-system';
export type * from '@minddrop/markdown';
export type * from '@minddrop/nodes';
export type * from '@minddrop/selection';
export type * from '@minddrop/theme';
export type * from '@minddrop/ui';
export type * from '@minddrop/workspaces';

export * from '@minddrop/icons';

import * as UtilsPackage from '@minddrop/utils';
import * as LocalUtils from './utils';

export const Utils = {
  ...UtilsPackage,
  ...LocalUtils,
};

export type { MindDropExtension, MindDropApi } from '@minddrop/extensions';

export { useApi, MindDropApiProvider } from '@minddrop/extensions';
