"use client";

import { Mail } from "../types/types";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "./ui/badge";
import { ComponentProps } from "react";
import { cn } from "../lib/utils";
import { useMailContext } from "../contexts/mail-context";

type MailCardProps = {
  mail: Mail;
};

export default function MailCard({ mail }: MailCardProps) {
  const { selectedMail, setSelectedMail } = useMailContext();

  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      <button
        key={mail.id}
        className={cn(
          "flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent",
          selectedMail?.id === mail.id && "bg-muted"
        )}
        onClick={() => setSelectedMail(mail)}
      >
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="font-semibold">{mail.name}</div>
              {!mail.read && (
                <span className="flex h-2 w-2 rounded-full bg-blue-600" />
              )}
            </div>
            <div
              className={cn(
                "ml-auto text-xs",
                selectedMail?.id === mail.id
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {formatDistanceToNow(new Date(mail.date), {
                addSuffix: true,
              })}
            </div>
          </div>
          <div className="text-xs font-medium">{mail.subject}</div>
        </div>
        <div className="line-clamp-2 text-xs text-muted-foreground">
          {mail.text.substring(0, 300)}
        </div>
        {mail.labels.length ? (
          <div className="flex items-center gap-2">
            {mail.labels.map((label) => (
              <Badge key={label} variant={getBadgeVariantFromLabel(label)}>
                {label}
              </Badge>
            ))}
          </div>
        ) : null}
      </button>
    </div>
  );
}

const getBadgeVariantFromLabel = (
  label: string
): ComponentProps<typeof Badge>["variant"] => {
  if (["work"].includes(label.toLowerCase())) {
    return "default";
  }

  if (["personal"].includes(label.toLowerCase())) {
    return "outline";
  }

  return "secondary";
};
