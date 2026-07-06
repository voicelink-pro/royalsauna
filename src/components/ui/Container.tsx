import { createElement } from "react";
import { cn } from "@/lib/utils";

type ContainerTag = "div" | "section" | "header" | "footer" | "main";

export function Container({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: ContainerTag;
}) {
  return createElement(
    as,
    { className: cn("mx-auto w-full max-w-content px-5 sm:px-8", className) },
    children,
  );
}
