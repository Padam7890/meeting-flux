import React, { ElementType, ReactNode } from 'react';

interface HeadingProps {
  /** The HTML tag to render, e.g. 'h1' | 'h2' | … */
  as?: ElementType;
  /** One of 'h1' | 'h2' | 'h3' | 'h4' */
  size?: 'h1' | 'h2' | 'h3' | 'h4';
  /** Text color: any of your CSS var names, e.g. 'primary', 'neutral-700' */
  color?: string;
  children: ReactNode;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h1',
  size = 'h1',
  color = 'primary',
  children,
  className = '',
}) => {

  const classes = [
    `text-${size}`,
    `leading-${size}`,
    `font-heading`,
    `text-${color}`,
    className,
  ].join(' ');

  return <Component className={classes}>{children}</Component>;
};

interface ParagraphProps {
  /** One of 'base' | 'sm' | 'xs' */
  size?: 'base' | 'sm' | 'xs';
  /** Text color: any of your CSS var names, e.g. 'neutral-600' | 'neutral-500' */
  color?: string;
  children: ReactNode;
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  size = 'base',
  color = 'neutral-700',
  children,
  className = '',
}) => {
  const textVar = `var(--text-${size})`;
  const leadingVar = `var(--leading-${size})`;
  const fontVar = `var(--font-sans)`;
  const colorVar = `var(--color-${color})`;

  const classes = [
    `text-[${textVar}]`,
    `leading-[${leadingVar}]`,
    `font-[${fontVar}]`,
    `text-[${colorVar}]`,
    className,
  ].join(' ');

  return <p className={classes}>{children}</p>;
};
