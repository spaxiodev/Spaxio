"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Gift, MessageCircle, Workflow } from "lucide-react";

type HeroNavCopy = {
  process: { description: string; date: string };
  mock: { description: string; date: string };
  quote: { description: string; date: string };
};

export default function HeroNavCards({
  titles,
  heroNav
}: {
  titles: { process: string; mock: string; quote: string };
  heroNav: HeroNavCopy;
}) {
  const iconClass = "text-blue-500";
  const titleClass = "text-blue-500";

  const cards = [
    {
      href: "#process",
      icon: <Workflow className="size-4 text-blue-300" />,
      title: titles.process,
      description: heroNav.process.description,
      date: heroNav.process.date,
      iconClassName: iconClass,
      titleClassName: titleClass,
      "aria-label": `${titles.process}: ${heroNav.process.description}`,
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-background/50 before:bg-blend-overlay before:outline-1 before:outline-border before:transition-opacity before:duration-700 before:content-[''] grayscale-[100%] hover:grayscale-0 hover:before:opacity-0"
    },
    {
      href: "#mock",
      icon: <Gift className="size-4 text-blue-300" />,
      title: titles.mock,
      description: heroNav.mock.description,
      date: heroNav.mock.date,
      iconClassName: iconClass,
      titleClassName: titleClass,
      "aria-label": `${titles.mock}: ${heroNav.mock.description}`,
      className:
        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:left-0 before:top-0 before:h-[100%] before:w-[100%] before:rounded-xl before:bg-background/50 before:bg-blend-overlay before:outline-1 before:outline-border before:transition-opacity before:duration-700 before:content-[''] grayscale-[100%] hover:grayscale-0 hover:before:opacity-0"
    },
    {
      href: "/quote",
      icon: <MessageCircle className="size-4 text-blue-300" />,
      title: titles.quote,
      description: heroNav.quote.description,
      date: heroNav.quote.date,
      iconClassName: iconClass,
      titleClassName: titleClass,
      "aria-label": `${titles.quote}: ${heroNav.quote.description}`,
      className: "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10"
    }
  ];

  return (
    <div className="flex min-h-[400px] w-full items-center justify-center overflow-x-auto py-6">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={cards} />
      </div>
    </div>
  );
}
