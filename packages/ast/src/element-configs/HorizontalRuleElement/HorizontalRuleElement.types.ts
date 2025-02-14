import { Element } from '../../types';

export interface HorizontalRuleElementData {
  /**
   * The markdown representation of the horizontal-rule.
   */
  markdown: string;
}

export type HorizontalRuleElement = Element<
  'horizontal-rule',
  HorizontalRuleElementData
>;
