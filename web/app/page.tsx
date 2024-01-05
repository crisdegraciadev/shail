"use client";

import Sidebar from "../components/sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../components/ui/resizable";
import MailInbox from "../components/mail-inbox";
import MailDisplay from "../components/mail-display";
import { MAILS } from "./data";
import { useMailContext } from "../contexts/mail-context";

export default function MailPage() {
  const { selectedMail } = useMailContext();

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={10} minSize={10} maxSize={15}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
          <MailInbox mails={MAILS} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60}>
          <MailDisplay mail={selectedMail} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
