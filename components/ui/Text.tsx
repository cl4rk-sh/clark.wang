import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
}

const baseStyles = "font-sans";
const mutedStyle = "text-muted-foreground";

const createTextComponent = (
  Element: keyof JSX.IntrinsicElements,
  defaultStyles: string
) => {
  return React.forwardRef<HTMLElement, TextProps>(
    ({ children, className = "", muted, ...props }, ref) => {
      const combinedClassName = `${baseStyles} ${defaultStyles} ${
        muted ? mutedStyle : ""
      } ${className}`.trim();
      return React.createElement(
        Element,
        { className: combinedClassName, ref, ...props },
        children
      );
    }
  );
};

export const H1 = createTextComponent("h1", "text-4xl font-bold mb-4");
export const H2 = createTextComponent("h2", "text-3xl font-semibold mb-3 ");
export const H3 = createTextComponent(
  "h3",
  "text-2xl font-medium mb-2 tracking-wide"
);
export const H4 = createTextComponent(
  "h4",
  "text-xl font-medium mb-2 tracking-wide"
);
export const H5 = createTextComponent(
  "h5",
  "text-lg font-normal mb-2 tracking-wide"
);
export const H6 = createTextComponent(
  "h6",
  "text-sm font-light mb-1 tracking-wide"
);
export const Paragraph = createTextComponent(
  "p",
  "text-base mb-2 font-light tracking-wide leading-7"
);
export const Span = createTextComponent("span", "inline");
