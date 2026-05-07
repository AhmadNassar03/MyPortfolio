import clsx from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hover?: boolean;
};

export function GlassSurface({
  children,
  hover = false,
  className,
  ...rest
}: Props) {
  return (
    <div
      {...rest}
      className={clsx(
        "glass relative overflow-hidden",
        hover && "hover-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
