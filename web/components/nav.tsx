"use client";

import { NavItem } from "../types/types";
import Link from "next/link";
import { cn } from "../lib/utils";
import { buttonVariants } from "./ui/button";

type NavProps = {
  items: NavItem[];
};

export default function Nav({ items }: NavProps) {
  return (
    <div className="flex flex-col p-2 gap-1">
      {items.map((item, index) => (
        <Link
          key={index}
          href="#"
          className={cn(
            buttonVariants({ variant: item.variant }),
            item.variant === "default" &&
              "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
            "justify-start"
          )}
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.title}
          {!!item.count && (
            <span
              className={cn(
                "ml-auto",
                item.variant === "default" && "text-background dark:text-white"
              )}
            >
              {item.count}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
