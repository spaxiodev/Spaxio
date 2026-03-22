"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";

interface DisplayCardProps {
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  "aria-label"?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
  href,
  onClick,
  "aria-label": ariaLabel,
}: DisplayCardProps) {
  const baseClass = cn(
    "relative flex h-36 w-[22rem] max-w-[min(22rem,calc(100vw-2rem))] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border-2 border-border bg-muted/70 px-4 py-3 backdrop-blur-sm transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
    href && "cursor-pointer no-underline outline-none focus-visible:ring-2 focus-visible:ring-foreground/30",
    className
  );

  const inner = (
    <>
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </>
  );

  if (href !== undefined) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={baseClass}
        aria-label={ariaLabel ?? title}
      >
        {inner}
      </a>
    );
  }

  return <div className={baseClass}>{inner}</div>;
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-background/50 before:bg-blend-overlay before:outline-1 before:outline-border before:transition-opacity before:duration-700 before:content-[''] grayscale-[100%] hover:grayscale-0 hover:before:opacity-0"
    },
    {
      className:
        "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-background/50 before:bg-blend-overlay before:outline-1 before:outline-border before:transition-opacity before:duration-700 before:content-[''] grayscale-[100%] hover:grayscale-0 hover:before:opacity-0"
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10"
    }
  ];

  const displayCards = cards ?? defaultCards;

  return (
    <div className="grid animate-in fade-in-0 duration-700 [grid-template-areas:'stack'] place-items-center opacity-100">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
