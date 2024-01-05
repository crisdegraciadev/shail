"use client";

import { useState } from "react";
import { Mail } from "../types/types";
import MailCard from "./mail-card";
import { ScrollArea } from "./ui/scroll-area";

type MailListProps = {
  mails: Mail[];
};

export default function MailList({ mails }: MailListProps) {
  return (
    <ScrollArea style={{ height: "50rem" }}>
      {mails.map((mail) => (
        <MailCard key={mail.id} mail={mail} />
      ))}
    </ScrollArea>
  );
}
