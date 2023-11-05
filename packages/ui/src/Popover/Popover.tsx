import * as PopoverPrimitive from '@radix-ui/react-popover';
import React, { FC } from 'react';
import { mapPropsToClasses } from '@minddrop/utils';
import './Popover.css';

export type PopoverProps = PopoverPrimitive.PopoverProps;
export type PopoverTriggerProps = PopoverPrimitive.PopoverTriggerProps;
export type PopoverAnchorProps = PopoverPrimitive.PopoverAnchorProps;
export type PopoverCloseProps = PopoverPrimitive.PopoverCloseProps;
export type PopoverContentProps = PopoverPrimitive.PopoverContentProps;

export const Popover = PopoverPrimitive.Root;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverPortal = PopoverPrimitive.Portal;

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ children, ...other }, ref) => (
  <PopoverPrimitive.Trigger asChild ref={ref} {...other}>
    {children}
  </PopoverPrimitive.Trigger>
));

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(({ children, className, asChild, ...other }, ref) => (
  <PopoverPrimitive.Content asChild ref={ref} {...other}>
    <div className={mapPropsToClasses({ className }, 'popover')}>
      {children}
    </div>
  </PopoverPrimitive.Content>
));

PopoverContent.displayName = 'PopoverContent';
